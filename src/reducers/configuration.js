import {
  CONFIGURATION_SET,
  CONFIGURATION_CLEAR,
  CONFIGURATION_STATUS_SET,
  CONFIGURATION_STATUS_CLEAR,
} from '../actions';

const baseConfigurationState = {
  self: {
    buffs: [],
    debuffs: [],
    burn: 0,
    bleed: 0,
    poison: 0,
    total: 0,
  },
  target: {
    buffs: [],
    debuffs: [],
    burn: 0,
    bleed: 0,
    poison: 0,
    total: 0,
  },
  rounding: 0,
  selfHealthPerc: 100,
  targetHealthPerc: 100,
  targetHealthMax: 50000,
  targetDefense: 0,
  numTargets: 1,
  elementalAdvantage: false,
  soulburn: false,
  stacks: 0,
};

const configuration = (state = baseConfigurationState, action) => {
  switch (action.type) {
    case CONFIGURATION_SET:
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    case CONFIGURATION_CLEAR:
      return Object.assign({}, baseConfigurationState);
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
