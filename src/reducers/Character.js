import {
	SET_CHARACTER,
	LOAD_CHARACTER,
	SET_STATS,
} from '../actions';

import { add } from '../utils/stats';

const character = (state = {
	current: 'ras',
	base: {},
	data: {},
	stats: {},
	modifiers: {},
}, action) => {
	switch (action.type) {
	case SET_CHARACTER:
		return Object.assign({}, state, {
			current: action.character,
		});
	case LOAD_CHARACTER: {
		const data = add(action.characterData, state.stats);
		return Object.assign({}, state, {
			base: action.characterData,
			data,
		});
	}
	case SET_STATS: {
		const stats = Object.assign(state.stats, action.stat);
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
