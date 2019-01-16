import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const middleware = [
	thunkMiddleware,
];

if (process.env.NODE_ENV === 'development') {
	const loggerMiddleware = createLogger();
	middleware.push(loggerMiddleware);
}

export default function configureStore(preloadedState) {
	return createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(...middleware),
		),
	);
}
