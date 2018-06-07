import { combineReducers } from 'redux';

const width = (state = 0, action) => {
  switch (action.type) {
    case 'SET_WIDTH':
      return action.payload;
    default:
      return state;
  }
};

const height = (state = 0, action) => {
  switch (action.type) {
    case 'SET_HEIGHT':
      return action.payload;
    default:
      return state;
  }
};

const ratio = (state = 0, action) => {
  switch (action.type) {
    case 'SET_RATIO':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({size})