import buffList from '../data/buffs.json';
import debuffList from '../data/debuffs.json';

/**
 * retrieves a misc_scaling object if it exists in the misc_scaling array, based on the name
 * property
 * @param  Object  skill skill
 * @param  String  scale misc_scaling name
 * @return Object        the misc_scaling object, if it exists
 */
function getMiscScaling(skill, scale) {
  if ('misc_scaling' in skill) {
    // there should only ever be one instance of a particular scaling modifier in misc_scaling
    const ret = skill.misc_scaling.filter(el => el.name === scale)[0];
    return ret && ret.length === 0 ? false : ret;
  }
  return false;
}

/**
 * applies soulburn values to a skill if possible
 * WARNING: shallow merge. this might have to be reworked for characters with more complex soulburn
 * @param  Object skill
 * @return Object       soulburned skill
 */
function soulburn(skill) {
  return Object.assign({}, skill, skill.soulburn);
}

/**
 * calculates damage given a character and a skill
 * @param  Object character
 * @param  Object skill
 * @param  Object configuration
 * @return Object                calculated total damage
 */
export function calculateDamage(character, activeSkill, configuration) {
  // if empty skill (non-damaging), just return N/A
  if (!activeSkill) return null;

  const { elementalAdvantage: eleAdv, self, target } = configuration;
  const { buffs: selfBuffs } = self;
  const { buffs, debuffs, bleed, burn, poison } = target;

  // base flat / multiplicative modifiers
  let flat = 0;
  let mult = 1;

  // elemental advantage configuration is mutable for certain skills, so reassign it here
  let hasElementalAdvantage = eleAdv;

  // if soulburned, get the soulburn attributes instead
  // soulburn can increase other multipliers, so att_rate modifications are separate (see below)
  let skill = activeSkill;
  if (skill.soulburn && configuration.soulburn) {
    skill = soulburn(skill);
  }

  // get att_rate, which can be modified (currently only luna)
  let { att_rate } = skill;

  // calculate flat scaling, if applicable
  if ('flat_scaling' in skill) {
    skill.flat_scaling.forEach(scaling => {
      flat += scaling.scalar * character[scaling.stat];
    });
  }

  // calculate multiplicative scaling, if applicable
  if ('mult_scaling' in skill) {
    let totalMultScaling = 1;
    skill.mult_scaling.forEach(scaling => {
      totalMultScaling *= scaling.scalar * character[scaling.stat];
    });
    mult *= 1 + totalMultScaling;
  }

  // cidd and luna get elemental advantage on their s3
  // cidd requires a speed buff
  const usesElementalAdvantage = getMiscScaling(skill, 'uses_elemental_advantage');
  if (usesElementalAdvantage) {
    if (usesElementalAdvantage.requiresAnyOf) {
      // bitwise operator here since cidd s3 can and should ele advantage when it's checked off
      // in the configuration anyway
      hasElementalAdvantage |= usesElementalAdvantage.requiresAnyOf.some(buff =>
        selfBuffs.includes(buff)
      );
    } else {
      hasElementalAdvantage = true;
    }
  }

  // missing health is calculated as a multiplicative scalar per 1% target missing health
  const missingHealth = getMiscScaling(skill, 'increased_per_missing_health');
  if (missingHealth) {
    const targetMissingHealth = 100 - configuration.targetHealthPerc;
    mult *= 1 + targetMissingHealth * missingHealth.scalar;
  }

  // increased damage from extra targets
  const incMultTargets = getMiscScaling(skill, 'increased_multiple_targets');
  if (incMultTargets) {
    mult *= 1 + (configuration.numTargets - 1) * 0.1;
  }

  // c.dominiel's increased damage from stacked crits
  const stackedCrit = getMiscScaling(skill, 'stacked_crit');
  if (stackedCrit) {
    mult *= 1 + configuration.stacks * stackedCrit.scalar;
  }

  // gunther gets increased damage if target is bleeding
  const targetIsBleeding = getMiscScaling(skill, 'target_is_bleeding');
  if (targetIsBleeding) {
    if (bleed > 0) {
      mult *= 1 + targetIsBleeding.scalar;
    }
  }

  // zerato's increased damage from "target is debuffed"
  const targetIsDebuffed = getMiscScaling(skill, 'target_is_debuffed');
  if (targetIsDebuffed) {
    if (debuffs.length > 0) {
      mult *= 1 + targetIsDebuffed.scalar;
    }
  }

  // jena and s.tenebria increase damage per debuff
  const increasedPerDebuff = getMiscScaling(skill, 'increased_per_debuff');
  if (increasedPerDebuff) {
    const numDebuffs = debuffs.length + bleed + burn + poison;
    mult *= 1 + numDebuffs * increasedPerDebuff.scalar;
  }

  // luna multihit on s1 is a little strange, and basically modifies att_rate at random with 3
  // possible outcomes. this is just set directly in the configuration as lunaMultiHit.
  const lunaMultiHit = getMiscScaling(skill, 'luna_multihit');
  if (lunaMultiHit) {
    att_rate = lunaMultiHit.att_rates[configuration.lunaMultiHit - 1];
  }

  // % max hp is PROBABLY calculated after pow and before mitigation... otherwise it's about
  // double the stated value and absolutely bonkers on top of crit damage (16% max hp anyone? 32%?)
  const targetMaxHealth = getMiscScaling(skill, 'target_max_health');
  let maxHealthDamage = 0;
  if (targetMaxHealth) {
    maxHealthDamage += configuration.targetHealthMax * targetMaxHealth.scalar;
  }

  // calculate any defense the enemy may have
  // if a skill penetrates defense, mitigation set to 1 (no defense)
  let defenseMult = 0;
  if (buffs.includes('defense_up')) {
    defenseMult += buffList.defense_up;
  }
  if (debuffs.includes('defense_down')) {
    defenseMult -= debuffList.defense_down;
  }
  const actualDefense = configuration.targetDefense * (1 + defenseMult);
  const defensePenetration = getMiscScaling(skill, 'defense_penetration');
  const mitigation = defensePenetration ? 1 : actualDefense / 300 + 1;

  // elemental advantage is an additional 1.1 multiplier (misses are still 1.0)
  const elementalAdvantage = hasElementalAdvantage ? 1.1 : 1.0;

  // overall base hit damage... pardon the ugliness
  let hit =
    (((character.attack * att_rate + flat) * mult * skill.pow * 1.871 + maxHealthDamage) /
      mitigation) *
    elementalAdvantage;

  // targeted debuff increases damage by another 15%, presumably after mitigation
  // based on the wording
  if (debuffs.includes('marked')) {
    hit *= 1 + debuffList.marked;
  }

  // calculate additional hitTypes
  const miss = hit * 0.75;
  const crush = hit * 1.3;

  // special on-crit modifier (currently limited to c.dominiel)
  let crit = (hit * character.crit_damage) / 100;
  const bonusCrit = getMiscScaling(skill, 'bonus_crit');
  if (bonusCrit) {
    crit *= 1 + bonusCrit.scalar;
  }

  // gunther can't crit... let's just return null
  const isGunther = getMiscScaling(skill, 'is_gunther');
  if (isGunther) {
    crit = null;
  }

  return {
    miss,
    hit,
    crush,
    crit,
  };
}

export function calculateReduction(character) {
  const { defense } = character;
  return 1 / (1 + defense / 300);
}

export function calculateEHP(character) {
  const { health } = character;
  return health / calculateReduction(character);
}

/**
 * calculates estimated damage for a skill, on average
 * @param  {[type]} critChance [description]
 * @param  {[type]} skill      [description]
 * @return {[type]}            [description]
 */
function estimateSkillDamage(critChance, skill) {
  if (skill) {
    if (skill.crit) {
      const nonCrit = ((100 - critChance) / 100) * skill.hit;
      const crit = (critChance / 100) * skill.crit;
      return nonCrit + crit;
    }
    return skill.hit;
  }
  // not a damaging skill
  return 0;
}

function bellonaDPT(character, skills) {
  const { crit_chance } = character;
  const estimates = {
    s1: estimateSkillDamage(crit_chance, skills.s1),
    s3: estimateSkillDamage(crit_chance, skills.s3),
  };

  return estimates.s1 + estimates.s3 / 5;
}

function lunaDPT(character, configuration, skills) {
  const { crit_chance } = character;
  // variable s3 cooldown...
  const s3cd = [5, 4, 3];
  const cooldownMults = {
    s1: 1,
    s3: 1 / s3cd[configuration.lunaMultiHit - 1],
  };
  const estimates = {
    s1: estimateSkillDamage(crit_chance, skills.s1),
    s3: estimateSkillDamage(crit_chance, skills.s3),
  };

  estimates.s1 *= 1 - cooldownMults.s3;
  estimates.s3 *= cooldownMults.s3;

  return estimates.s1 + estimates.s3;
}

function sezDPT(character, configuration, skills) {
  const { crit_chance } = character;
  const { targetHealthPerc } = configuration;

  const cooldownMults = {
    s1: 1,
    s3: character.s3 ? 1 / character.s3.cooldown : 0,
  };
  const estimates = {
    s1: estimateSkillDamage(crit_chance, skills.s1),
    s2: targetHealthPerc < 50 ? estimateSkillDamage(crit_chance, skills.s2) : 0,
    s3: estimateSkillDamage(crit_chance, skills.s3),
  };

  // add sez s2, since it's a secondary effect of his s1
  estimates.s1 += estimates.s2;
  estimates.s1 *= 1 - cooldownMults.s3;
  estimates.s3 *= cooldownMults.s3;

  return estimates.s1 + estimates.s3;
}

/**
 * calculates estimated damage per turn. this is the base algorithm.
 * @param  Object character character
 * @param  Object skills    calculated skill damage
 * @return Number           damage per turn
 */
export function calculateDPT(character, configuration, skills) {
  // some characters have a different DPT function
  switch (character.name) {
    case 'Bellona':
      return bellonaDPT(character, skills);
    case 'Luna':
      return lunaDPT(character, configuration, skills);
    case 'Sez':
      return sezDPT(character, configuration, skills);
    default:
      break;
  }

  const { crit_chance } = character;
  const cooldownMults = {
    s1: character.s1 ? 1 / character.s1.cooldown : 0,
    s2: character.s2 ? 1 / character.s2.cooldown : 0,
    s3: character.s3 ? 1 / character.s3.cooldown : 0,
  };
  const estimates = {
    s1: estimateSkillDamage(crit_chance, skills.s1),
    s2: estimateSkillDamage(crit_chance, skills.s2),
    s3: estimateSkillDamage(crit_chance, skills.s3),
  };

  // calculate the average dps over several turns
  // Damage per turn = (S2 damage / S2 cooldown) + (S3 damage / S3 cooldown) + (S1 damage * (1 - (1 / S2 cooldown + 1 / S3 cooldown)))
  // source: /u/noarure https://www.reddit.com/r/EpicSeven/comments/alnhuf/optimal_gear_calculations_for_luna_sez_c_lorina/
  estimates.s1 *= 1 - (cooldownMults.s2 + cooldownMults.s3);
  estimates.s2 *= cooldownMults.s2;
  estimates.s3 *= cooldownMults.s3;

  return estimates.s1 + estimates.s2 + estimates.s3;
}

/**
 * calculates estimated total damage given speed and CR buffs
 * @param  Object character character
 * @param  Number dpt       damage per turn
 * @return Number           total damage output
 */
export function calculateTDO(character, dpt) {
  return dpt * (character.speed / 100);
}
