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

const gamePlayer = (state = '', action) => {
  switch(action.type) {
    case GAME_ACTIONS.SET_PLAYER:
      return action.payload;
    default:
      return state;
  }
}

const prompt1 = (state = {}, action) => {
  switch(action.type) {
    case 'SET_PROMPT_1':
      let pop = action.payload;
      return {
        id: pop.id,
        prompt: pop.prompt, 
        answer: pop.answer,
        possible1: pop.answers[0],
        possible2: pop.answers[1],
        possible3: pop.answers[2],
      }
    default:
      return state;
  }
}

const prompt2 = (state = {}, action) => {
  switch(action.type) {
    case 'SET_PROMPT_2':
      let pop = action.payload;
      return {
        id: pop.id,
        prompt: pop.prompt,
        answer: pop.answer,
        possible1: pop.answers[0],
        possible2: pop.answers[1],
        possible3: pop.answers[2],
      }
    default:
      return state;
  }
}

const prompt3 = (state = {}, action) => {
  switch(action.type) {
    case 'SET_PROMPT_3':
      let pop = action.payload;
      return {
        id: pop.id,
        prompt: pop.prompt,
        answer: pop.answer,
        possible1: pop.answers[0],
        possible2: pop.answers[1],
        possible3: pop.answers[2],
      }
    default:
      return state;
  }
}

const scores = (state = {player: 0, watson: 0, holmes: 0}, action) => {
  switch(action.type) {
    case GAME_ACTIONS.SET_PLAYER_SCORE:
      return {...state, player: action.payload}
    case GAME_ACTIONS.SET_WATSON_SCORE:
      return {...state, watson: action.payload}
    case GAME_ACTIONS.SET_HOLMES_SCORE:
      return {...state, holmes: action.payload}
    default:
      return state;
  }
}

export default combineReducers({
  gameStatus,
  gamePrompt,
  gameAnswer,
  gameRound,
  gamePlayer,
  prompt1,
  prompt2,
  prompt3,
  scores
});