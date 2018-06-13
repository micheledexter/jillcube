import { combineReducers } from 'redux';
import { GAME_ACTIONS } from '../actions/mainGameActions';

const gameStatus = (state = {status: '', user: ''}, action) => {
  switch (action.type) {
    case GAME_ACTIONS.SET_START:
      return {status: 'pending', user: action.payload};
    default:
      return state;
  }
}

export default combineReducers({
  gameStatus,
});