import {
	CHARACTER_SET,
	CHARACTER_LOAD,
	CHARACTER_SET_STATS,
} from '../actions';

import { add } from '../utils/stats';

const character = (state = {
	current: 'ras',
	base: {},
	data: {},
	stats: {},
}, action) => {
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
