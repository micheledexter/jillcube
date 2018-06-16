import { call, put, takeLatest } from 'redux-saga/effects';
import { GAME_ACTIONS } from '../actions/mainGameActions';
import axios from 'axios';
import { 
  // setGameStatus, 
  // getGameInstances, 
  createGameInstance,
  // getPendingGameByCode,
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

function* getPrompts() {
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  try {
    const response = yield call (axios.get, `/api/data/list`);
    const list = response.data;
    let chosen = [-1, -1, -1];
    let random = [-1, -1, -1];
    let prompt = [-1, -1, -1];
    let new_prompt = [-1, -1, -1];
    let watson = [-1, -1, -1];
    let holmes = [-1, -1, -1];
    let randWatson = [-1, -1, -1];
    let randHolmes = [-1, -1, -1];
    let pickWatson = [-1, -1, -1];
    let pickHolmes = [-1, -1, -1];
    let answers = [[], [], []];
    while (random[0] === random[1] || random[1] === random[2] || random[0] === random[2]) {
      for (let i = 0; i < 3; i++) {
        random[i] = Math.floor(Math.random() * list.length);
        chosen[i] = list[random[i]].id;
        prompt[i] = yield call (axios.get, `/api/data/id/${chosen[i]}`);
        new_prompt[i] = prompt[i].data[0];
        watson[i] = yield call (axios.get, `/api/watson/prompt/${new_prompt[i].id}`);
        holmes[i] = yield call (axios.get, `/api/holmes/prompt/${new_prompt[i].id}`);
        randWatson[i] = Math.floor(Math.random() * watson[i].data.length);
        randHolmes[i] = Math.floor(Math.random() * holmes[i].data.length);
        pickWatson[i] = watson[i].data[randWatson[i]].answer;
        pickHolmes[i] = holmes[i].data[randHolmes[i]].answer;
        answers[i] = [new_prompt[i].answer, pickWatson[i], pickHolmes[i]];
        answers[i] = shuffle(answers[i]);
        new_prompt[i] = {...new_prompt[i], answers: answers[i]};
        yield put ({ type: `SET_PROMPT_${i+1}`, payload: new_prompt[i] })
      }
    }
    /* BEGIN OLD CRAP CODE HERE (keep to look at how stupid you were before)
    const random = Math.floor(Math.random() * list.length);

    const prompt1 = yield call (axios.get, `/api/data/id/${chosen[0]}`);
    const prompt2 = yield call (axios.get, `/api/data/id/${chosen[1]}`);
    const prompt3 = yield call (axios.get, `/api/data/id/${chosen[2]}`);
    const new_prompt1 = prompt1.data[0];
    const new_prompt2 = prompt2.data[0];
    const new_prompt3 = prompt3.data[0];
    const new_prompt = prompt.data[0];

    yield put ({ type: GAME_ACTIONS.REMOVE_ANSWERS });
    yield put ({ type: GAME_ACTIONS.ADD_ANSWER, payload: new_prompt.answer});
    const watson = yield call (axios.get, `/api/watson/prompt/${new_prompt.id}`);
    const holmes = yield call (axios.get, `/api/holmes/prompt/${new_prompt.id}`);
    const randWatson = Math.floor(Math.random() * watson.data.length);
    const randHolmes = Math.floor(Math.random() * holmes.data.length);
    const pickWatson = watson.data[randWatson].answer;
    const pickHolmes = holmes.data[randHolmes].answer;
    let answers = [new_prompt.answer, pickWatson, pickHolmes];
    answers = shuffle(answers);
    yield put ({ type: GAME_ACTIONS.ADD_ANSWER, payload:pickWatson });
    yield put ({ type: GAME_ACTIONS.ADD_ANSWER, payload:pickHolmes });
    yield put ({ type: GAME_ACTIONS.ADD_ANSWER, payload: answers });

    const watson1 = yield call (axios.get, `/api/watson/prompt/${new_prompt1.id}`);
    const holmes1 = yield call (axios.get, `/api/holmes/prompt/${new_prompt1.id}`);
    const watson2 = yield call (axios.get, `/api/watson/prompt/${new_prompt2.id}`);
    const holmes2 = yield call (axios)

    yield put ({ type: 'SET_PROMPT_1', payload: new_prompt1 });
    yield put ({ type: 'SET_PROMPT_2', payload: new_prompt2 });
    yield put ({ type: 'SET_PROMPT_3', payload: new_prompt3 });
    */ // END OLD CRAP CODE HERE
  } catch (error) {
    console.error(error);
  }
}

function* mainGameSaga() {
  yield takeLatest(GAME_ACTIONS.START_GAME, startNewGame);
  yield takeLatest(GAME_ACTIONS.NEW_PROMPT, getPrompts);
}

export default mainGameSaga;