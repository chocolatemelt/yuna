import {
	GEAR_SET,
	GEAR_CLEAR,
} from '../actions';

// import { add } from '../utils/stats';

const gear = (state = {
	artifact: {},
	weapon: {},
	helmet: {},
	armor: {},
	necklace: {},
	ring: {},
	boots: {},
	modifiers: {
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
	},
	sets: [],
}, action) => {
	switch (action.type) {
	case GEAR_SET: {
		const newGear = {
			[action.gear]: action.modifiers,
		};
		return Object.assign({}, state, newGear);
	}
	case GEAR_CLEAR: {
		const clear = {
			[action.gear]: {},
		};
		return Object.assign({}, state, clear);
	}
	default:
		return state;
	}
};

export default gear;
