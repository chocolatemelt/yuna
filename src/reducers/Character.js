import {
	SET_CHARACTER,
} from '../actions';

const character = (state = {
	current: null,
}, action) => {
	switch (action.type) {
	case SET_CHARACTER:
		return Object.assign({}, state, {
			current: action.character,
		});
	default:
		return state;
	}
};

export default {
	character,
};
