import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './localStorage';
import rootReducer from '../reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();
  middleware.push(loggerMiddleware);
}

export default function configureStore(preloadedState) {
  const persistedState = initState => loadState(initState);

  const store = createStore(
    rootReducer,
    persistedState(preloadedState),
    composeEnhancers(applyMiddleware(...middleware))
  );

  store.subscribe(
    throttle(() => {
      saveState({
        ...store.getState(),
      });
    }, 1000)
  );

  return store;
}
