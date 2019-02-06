import {
	CONFIGURATION_SET,
	CONFIGURATION_CLEAR,
	CONFIGURATION_STATUS_SET,
	CONFIGURATION_STATUS_CLEAR,
} from '../actions';

const configuration = (state = {
	self: [],
	target: [],
	rounding: 0,
	selfHealthPerc: 100,
	targetHealthPerc: 100,
	targetHealthMax: 50000,
	targetDefense: 0,
	numTargets: 1,
	elementalAdvantage: false,
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
			self: [],
			target: [],
			rounding: 0,
			selfHealthPerc: 100,
			targetHealthPerc: 100,
			targetHealthMax: 50000,
			targetDefense: 0,
			numTargets: 1,
			elementalAdvantage: false,
			soulburn: false,
			stacks: 0,
		});
	case CONFIGURATION_STATUS_SET:
		return Object.assign({}, state, {
			[action.target]: action.status,
		});
	case CONFIGURATION_STATUS_CLEAR:
		return Object.assign({}, state, {
			[action.target]: [],
		});
	default:
		return state;
	}
};

export default configuration;
