import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import admin from './adminReducer';
import mainGame from './mainGameReducer';

const store = combineReducers({
  user,
  login,
  admin,
  mainGame,
});

export default store;
