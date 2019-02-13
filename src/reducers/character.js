import {
  CHARACTER_SET,
  CHARACTER_LOAD,
  CHARACTER_SET_STATS,
  CHARACTER_STATS_CLEAR_ALL,
} from '../actions';

import { add } from '../utils/stats';

const baseStats = {
  attack: 0,
  health: 0,
  speed: 0,
  defense: 0,
  crit_chance: 0,
  crit_damage: 0,
  effectiveness: 0,
  effect_res: 0,
};

const characterBaseState = {
  current: 'ras',
  base: {},
  data: {},
  stats: baseStats,
};

const character = (state = characterBaseState, action) => {
  switch (action.type) {
    case CHARACTER_SET:
      return Object.assign({}, state, {
        current: action.character,
      });
    case CHARACTER_LOAD: {
      const data = add(action.characterData, state.stats);
      return Object.assign({}, state, {
        base: action.characterData,
        data,
      });
    }
    case CHARACTER_STATS_CLEAR_ALL: {
      return Object.assign({}, state, {
        stats: baseStats,
      });
    }
    case CHARACTER_SET_STATS: {
      const stats = Object.assign({}, state.stats, action.stat);
      const data = add(state.base, stats);
      return Object.assign({}, state, {
        data,
        stats,
      });
    }
    default:
      return state;
  }
};

export default character;
