import {
	SET_CHARACTER,
	LOAD_CHARACTER,
	SET_STATS,
} from '../actions';

const character = (state = {
	current: 'ras',
	data: {},
	stats: {},
	modifiers: {},
}, action) => {
	switch (action.type) {
	case SET_CHARACTER:
		return Object.assign({}, state, {
			current: action.character,
		});
	case LOAD_CHARACTER:
		return Object.assign({}, state, {
			data: action.characterData,
		});
	case SET_STATS:
		return Object.assign({}, state, {
			stats: Object.assign(state.stats, action.stat),
		});
	default:
		return state;
	}
};

export default character;
