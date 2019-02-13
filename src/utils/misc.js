import characterData from '../data/characters.json';

export function add(a, e) {
  return a.concat([e]);
}

export function remove(a, e) {
  return a.filter(el => el !== e);
}

// this is technically a relative complement
export function complement(a, b) {
  return a.filter(el => !b.includes(el));
}

export const statNames = {
  element: 'Element',
  attack: 'Attack',
  attack_flat: 'Flat Attack',
  attack_mult: 'Attack %',
  health: 'Health',
  health_flat: 'Flat Health',
  health_mult: 'Health %',
  speed: 'Speed',
  defense: 'Defense',
  defense_flat: 'Flat Defense',
  defense_mult: 'Defense %',
  crit_chance: 'Crit. Chance',
  crit_damage: 'Crit. Damage',
  effectiveness: 'Effectiveness',
  effect_res: 'Effect Resistance',
};

export const getName = stat => statNames[stat];

export const getIdentifier = name => name.replace(/ /g, '_').toLowerCase();

export const getCharacterName = identifier => characterData[identifier].name;
