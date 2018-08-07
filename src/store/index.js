import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';

export const history = createHistory();

const loggerMiddleware = createLogger({
  predicate: (state, action) => process.env.NODE_ENV === 'development'
});

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  loggerMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,

  composedEnhancers
);

export default store;
