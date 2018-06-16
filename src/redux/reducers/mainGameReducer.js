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

const gameAnswer = (state = {true: '', watsonLie: '', holmesLie: ''}, action) => {
  switch (action.type) {
    case GAME_ACTIONS.ADD_ANSWER:
      return [...state, ...action.payload];
    default:
      return state;
  }
}

const gameRound = (state = 0, action) => {
  switch(action.type) {
    case GAME_ACTIONS.NEXT_ROUND:
      return state + 1;
    case GAME_ACTIONS.RESTART_ROUNDS:
      return 0;
    default:
      return state;
  }
}

export default combineReducers({
  gameStatus,
  gamePrompt,
  gameAnswer,
  gameRound,
});