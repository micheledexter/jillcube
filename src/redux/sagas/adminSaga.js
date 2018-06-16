import { call, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_ACTIONS } from '../actions/adminActions';
import { fetchGameData } from '../requests/adminRequests';
import axios from 'axios';

function* getGameData() {
  try {
    const response = yield fetchGameData();
    yield put({ type: ADMIN_ACTIONS.SET_GAME_DATA, payload:response });
  } catch (error) {
    console.error(error);
  }
}

function* addNewSubmission(action) {
  const submission = action.payload;
  try {
    yield call (axios.post, '/api/data/', submission);
    getGameData();
  } catch (error) {
    console.error(error);
  }
}

function* deleteDataSubmission(action) {
  const id = action.payload;
  try {
    yield call (axios.delete, `/api/data/${id}`);
    getGameData();
  } catch (error) {
    console.error(error);
  }
}

function* adminSaga() {
  yield takeLatest(ADMIN_ACTIONS.GET_GAME_DATA, getGameData);
  yield takeLatest(ADMIN_ACTIONS.NEW_SUBMISSION, addNewSubmission);
  yield takeLatest(ADMIN_ACTIONS.DELETE_DATA_ENTRY, deleteDataSubmission);
}

export default adminSaga;