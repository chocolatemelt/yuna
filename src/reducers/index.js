import { combineReducers } from 'redux';

import character from './character';
import configuration from './configuration';
import gear from './gear';

export default combineReducers({
	character,
	configuration,
	gear,
});
