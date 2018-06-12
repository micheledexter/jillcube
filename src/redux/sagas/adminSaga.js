import { put, takeLatest } from 'redux-saga/effects';
import { ADMIN_ACTIONS } from '../actions/adminActions';
import { fetchGameData } from '../requests/adminRequests';

function* getGameData() {
  try {
    const response = yield fetchGameData();
    yield put({ type: ADMIN_ACTIONS.SET_GAME_DATA, payload:response });
  } catch (error) {
    console.error(error);
  }
}

function* adminSaga() {
  yield takeLatest(ADMIN_ACTIONS.GET_GAME_DATA, getGameData);
}

export default adminSaga;