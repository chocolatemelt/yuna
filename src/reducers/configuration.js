import {
	CONFIGURATION_SET,
	CONFIGURATION_CLEAR,
} from '../actions';

const configuration = (state = {
	buffs: [],
	debuffs: [],
	rounding: 0,
	selfHealthPerc: 100,
	targetHealthPerc: 100,
	soulburn: false,
	stacks: 0,
}, action) => {
	switch (action.type) {
	case CONFIGURATION_SET:
		return Object.assign({}, state, {
			[action.key]: action.value,
		});
	case CONFIGURATION_CLEAR:
		return Object.assign({}, state, {
			buffs: [],
			debuffs: [],
			rounding: 0,
			selfHealthPerc: 100,
			targetHealthPerc: 100,
			soulburn: false,
			stacks: 0,
		});
	default:
		return state;
	}
};

export default configuration;
