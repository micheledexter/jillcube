import { combineReducers } from 'redux'
import { ADMIN_ACTIONS } from '../actions/adminActions';

const gameData = (state = [], action) => {
  switch (action.type) {
    case ADMIN_ACTIONS.SET_GAME_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  gameData,
});