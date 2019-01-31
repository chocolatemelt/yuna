import {
	CONFIGURATION_SET,
	CONFIGURATION_CLEAR,
} from '../actions';

const configuration = (state = {
	stacks: 0,
	buffs: [],
	debuffs: [],
	selfHealthPerc: 100,
	targetHealthPerc: 100,
	soulburn: false,
}, action) => {
	switch (action.type) {
	case CONFIGURATION_SET:
		return Object.assign({}, state, {
			[action.key]: action.value,
		});
	case CONFIGURATION_CLEAR:
		return Object.assign({}, state, {
			stacks: 0,
			buffs: [],
			debuffs: [],
			selfHealthPerc: 100,
			targetHealthPerc: 100,
			soulburn: false,
		});
	default:
		return state;
	}
};

export default configuration;
