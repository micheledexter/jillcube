import { combineReducers } from 'redux';

const location = (state = '', action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  location,
});