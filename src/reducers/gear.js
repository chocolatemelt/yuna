import {
	GEAR_RECALCULATE,
	GEAR_SET,
	GEAR_CLEAR,
} from '../actions';

import { add } from '../utils/stats';

const baseModifiers = {
	attack_flat: 0,
	attack_mult: 0,
	health_flat: 0,
	health_mult: 0,
	defense_flat: 0,
	defense_mult: 0,
	crit_chance: 0,
	crit_damage: 0,
	effectiveness: 0,
	effect_res: 0,
	speed: 0,
};

const gear = (state = {
	artifact: {},
	weapon: {},
	helmet: {},
	armor: {},
	necklace: {},
	ring: {},
	boots: {},
	modifiers: baseModifiers,
	sets: [],
}, action) => {
	switch (action.type) {
	case GEAR_RECALCULATE: {
		// this is shitty code
		let newModifiers = Object.assign({}, baseModifiers);
		Object.keys(state).forEach((k) => {
			if (k !== 'modifiers') {
				newModifiers = add(newModifiers, state[k]);
			}
		});
		return Object.assign({}, state, {
			modifiers: newModifiers,
		});
	}
	case GEAR_SET: {
		return Object.assign({}, state, {
			[action.gear]: action.stats,
		});
	}
	case GEAR_CLEAR: {
		const clear = {
			[action.gear]: {},
			modifiers: baseModifiers,
			sets: [],
		};
		return Object.assign({}, state, clear);
	}
	default:
		return state;
	}
};

export default gear;
