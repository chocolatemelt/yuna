import { combineReducers } from 'redux';

import character from './character';
import gear from './gear';

export default combineReducers({
	character,
	gear,
});
