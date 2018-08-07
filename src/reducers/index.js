import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import menu from './menu';
import admin from './admin';
import users from './users';
import events from './events';
import establishments from './establishments';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  menu,
  admin,
  users,
  events,
  establishments
});

export default rootReducer;
