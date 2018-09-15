import fetch from 'isomorphic-fetch';

// eslint-disable-next-line max-len
const api = async () => fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => json);

export default api;
