import { combineReducers } from 'redux';
import { GAME_ACTIONS } from '../actions/mainGameActions';

const gameStatus = (state = {status: '', user: ''}, action) => {
  switch (action.type) {
    case GAME_ACTIONS.SET_START:
      return {status: 'pending', user: action.payload};
    default:
      return state;
  }
};

const gamePrompt = (state = {id: '', prompt: '', answer: ''}, action) => {
  switch (action.type) {
    case GAME_ACTIONS.SET_PROMPT:
      return {
        id: action.payload.id,
        prompt: action.payload.prompt,
        answer: action.payload.answer,
      }
    default:
      return state;
  }
};

export default combineReducers({
  gameStatus,
  gamePrompt,
});