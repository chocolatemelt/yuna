import {
	SET_CHARACTER,
	LOAD_CHARACTER,
} from '../actions';

const character = (state = {
	current: 'ras',
	data: {},
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
	default:
		return state;
	}
};

export default character;
