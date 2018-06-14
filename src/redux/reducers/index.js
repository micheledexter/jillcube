import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import admin from './adminReducer';
import mainGame from './mainGameReducer';
import location from './locationReducer';

const store = combineReducers({
  user,
  login,
  admin,
  mainGame,
  location,
});

export default store;
