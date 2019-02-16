import { limit } from './misc';
import buffList from '../data/buffs.json';
import debuffList from '../data/debuffs.json';

export const baseStats = {
  attack: 0,
  health: 0,
  speed: 0,
  defense: 0,
  crit_chance: 0,
  crit_damage: 0,
  effectiveness: 0,
  effect_res: 0,
};

/**
 * add two stat objects together
 * @param Object s1
 * @param Object s2
 */
export function add(s1, s2) {
  // shallow reduce since we're only concerned with numbers
  const ret = Object.assign({}, s1);
  Object.keys(s1).forEach(k => {
    if (Object.prototype.hasOwnProperty.call(s2, k)) {
      ret[k] = (s1[k] || 0) + s2[k];
    }
  });
  return ret;
}

const isNamedStat = stat =>
  stat === 'crit_chance' || stat === 'crit_damage' || stat === 'effect_res';

/**
 * calculates final stats from base stats and gear modifiers
 * @param  Object base      base character stats
 * @param  Object flat      flat stats from stat form
 * @param  Object modifiers gear modifiers
 * @param  Object status    buffs and debuffs applied to the character
 * @return Object           final stats
 */
export function calculateStats(base, flat, modifiers, status) {
  let ret = Object.assign({}, base);
  Object.keys(modifiers).forEach(k => {
    // this code sucks
    const namedStat = isNamedStat(k) ? k : k.split('_')[0];
    let result = modifiers[k];

    if (k.endsWith('mult')) {
      result = base[namedStat] * (modifiers[k] / 100);
    }

    ret[namedStat] += result;
  });

  // add the flat numbers from the stat sheet
  ret = add(ret, flat);

  // buffs / debuffs that affect stats
  let attackMult = 0;
  let defenseMult = 0;
  let speedMult = 0;
  let critChanceAdd = 0;
  let critDamageAdd = 0;
  const { buffs, debuffs } = status;

  // pardon the :Megupuke: code
  // THIS ASSUMES BUFFS AND DEBUFFS ARE ADDITIVELY CALCULATED. there's no indication this is true.
  // TODO: move this shit out into a separate buff calc function
  // possible TODO: crit chance, crit damage, etc. set to actual decimals
  if (buffs.includes('arky')) {
    attackMult += buffList.arky;
    critChanceAdd += buffList.arky * 100; // arky's buff is set to 20%, but this is additive
  }

  if (buffs.includes('attack_up_greater')) {
    attackMult += buffList.attack_up_greater;
  } else if (buffs.includes('attack_up')) {
    attackMult += buffList.attack_up;
  }

  if (buffs.includes('defense_up')) {
    defenseMult += buffList.defense_up;
  }

  if (buffs.includes('speed_up_greater')) {
    speedMult += buffList.speed_up_greater;
  } else if (buffs.includes('speed_up')) {
    speedMult += buffList.speed_up;
  }

  if (buffs.includes('crit_chance_up')) {
    critChanceAdd += buffList.crit_chance_up;
  }

  if (buffs.includes('crit_damage_up')) {
    critDamageAdd += buffList.crit_damage_up;
  }

  if (debuffs.includes('attack_down')) {
    attackMult -= debuffList.attack_down;
  }

  if (debuffs.includes('defense_down')) {
    defenseMult -= debuffList.defense_down;
  }

  if (debuffs.includes('speed_down')) {
    speedMult -= debuffList.speed_down;
  }

  // apply stat-boosting passives (assumed to be post-)
  switch (base.name) {
    case 'Gunther':
      ret.attack *= 1.5;
      break;
    default:
      break;
  }

  // apply multipliers
  ret.attack *= 1 + attackMult;
  ret.defense *= 1 + defenseMult;
  ret.speed *= 1 + speedMult;
  ret.crit_chance += critChanceAdd;
  ret.crit_damage += critDamageAdd;

  // hard limits on crit, effectiveness, and eff. resistance
  ret.crit_chance = limit(ret.crit_chance, 0, 100);
  ret.effectiveness = limit(ret.effectiveness, 0, 100);
  ret.effect_res = limit(ret.effect_res, 0, 100);

  return ret;
}
