import axios from 'axios';

const config = {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
};

// export function setGameStatus(status) {
//   axios.post()
// }

export function getGameInstances() {
  axios.get('/api/game-instance', config)
  .then(response => response)
  .catch(error => {
    throw error.response || error;
  });
}

export function createGameInstance(code, gameId) {
  axios.post('/api/game-instance', { code: code, gameId: gameId } , config)
  .then(response => {return response.data})
  .catch(error => {
    throw error.response || error;
  });
}

export function getPendingGameByCode(code) {
  axios.get(`/api/game-instance/code/${code}`, config)
  .then(response => response.data[response.data.length-1])
  .catch(error => {
    throw error.response || error;
  });
}