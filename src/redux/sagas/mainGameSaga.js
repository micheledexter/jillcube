import { call, put, takeLatest } from 'redux-saga/effects';
import { GAME_ACTIONS } from '../actions/mainGameActions';
import axios from 'axios';
import { 
  setGameStatus, 
  getGameInstances, 
  createGameInstance,
  getPendingGameByCode,
} from '../requests/mainGameRequests';

function* startNewGame(action) {
  try {
    // const response = yield getGameInstances();
    // console.log(response);
    // yield setGameStatus('pending');
    // const response = yield getPendingGameByCode(action.payload);
    const response = yield call (axios.get, `/api/game-instance/code/${action.payload}`);
    const latest = response.data[response.data.length - 1] || null;
    console.log(latest);
    if (latest !== null) {
      yield call (axios.delete, `/api/game-instance/${latest.id}`);
    }
    yield createGameInstance(action.payload, 2);
    yield put({ type:GAME_ACTIONS.SET_START, payload:action.payload });
  } catch (error) {
    console.error(error);
  }
}

function* getPrompt() {
  try {
    const response = yield call (axios.get, `/api/data/list`);
    const list = response.data;
    const random = Math.floor(Math.random() * list.length);
    const chosen = list[random].id;
    const prompt = yield call (axios.get, `/api/data/id/${chosen}`);
    const new_prompt = prompt.data[0];
    yield put ({ type: GAME_ACTIONS.SET_PROMPT, payload: new_prompt });
  } catch (error) {
    console.error(error);
  }
}

function* mainGameSaga() {
  yield takeLatest(GAME_ACTIONS.START_GAME, startNewGame);
  yield takeLatest(GAME_ACTIONS.NEW_PROMPT, getPrompt);
}

export default mainGameSaga;