import axios from 'axios';

export function fetchGameData() {
  const config = {
    headers: { 'Content-type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/data', config)
  .then(response => response.data)
  .catch(error => {
    throw error.response || error;
  });
}