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
export default function calculateDamage(character, activeSkill, configuration) {
  // if empty skill (non-damaging), just return N/A
  if (!activeSkill) return 'N/A';

  const { elementalAdvantage: eleAdv, self, target } = configuration;
  const { buffs: selfBuffs } = self;
  const { buffs, debuffs, bleed, burn, poison } = target;
  let skill = activeSkill;

  // elemental advantage configuration is mutable for certain skills, so reassign it here
  let hasElementalAdvantage = eleAdv;

  // if soulburned, get the soulburn attributes instead
  if (skill.soulburn && configuration.soulburn) {
    skill = soulburn(skill);
  }

  // calculate flat scaling, if applicable
  let flat = 0;
  if ('flat_scaling' in skill) {
    skill.flat_scaling.forEach(scaling => {
      flat += scaling.scalar * character[scaling.stat];
    });
  }

  // calculate multiplicative scaling, if applicable
  let mult = 0;
  if ('mult_scaling' in skill) {
    mult = 1;
    skill.mult_scaling.forEach(scaling => {
      mult *= scaling.scalar * character[scaling.stat];
    });
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

  // gunther gets 0.5 increased attack... but can't crit
  // since he has no flat modifiers, this is just a 50% increase in damage
  const isGunther = getMiscScaling(skill, 'is_gunther');
  if (isGunther) {
    mult *= 1 + isGunther.scalar;
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
    (((character.attack * skill.att_rate + flat) * (1 + mult) * skill.pow * 1.871 +
      maxHealthDamage) /
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

  // gunther can't crit... let's just return N/A
  if (isGunther) {
    crit = 'N/A';
  }

  return {
    miss,
    hit,
    crush,
    crit,
  };
}
