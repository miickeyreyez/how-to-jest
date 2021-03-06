import fetch from 'isomorphic-fetch';
import fs from 'fs';
import MyCustomError from './error';

const sum = (a, b) => a + b;

const helloWorld = () => 'Hello World!';

const isOddNumber = number => number % 2 === 0;

// eslint-disable-next-line max-len
const getUserFromApi = async () => fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => json);

const customError = () => {
  throw new MyCustomError();
};

const createFile = (filePath, fileContent) => {
  if (!filePath || !fileContent) {
    throw new MyCustomError();
  }

  try {
    fs.writeFileSync(filePath, fileContent);
  } catch (error) {
    throw new MyCustomError();
  }
};

export {
  sum,
  isOddNumber,
  getUserFromApi,
  helloWorld,
  customError,
  createFile,
};
