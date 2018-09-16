import {
  sum, isOddNumber,
  getUserFromApi, helloWorld, customError, createFile,
} from '.';
import api from './api';
import * as functions from './functions';
import MyCustomError from './error';

jest.mock('./api');
jest.mock('fs');

// eslint-disable-next-line max-len
functions.anotherHelloWorld = jest.fn().mockImplementation(() => 'Mock hello world');

const userStub = {
  completed: true,
  id: 1001,
  title: 'My own title',
  userId: 1001,
};

api.mockImplementation(async flag => new Promise((resolve, reject) => {
  if (flag) resolve(userStub);
  reject(new MyCustomError());
}));

test('helloWorld function returns Hello World string', () => {
  expect(helloWorld()).toEqual('Hello World!');
});

test('anotherHelloWorld function returns my mock Hello World string', () => {
  expect(functions.anotherHelloWorld()).toEqual('Mock hello world');
});

test('helloWorld function returns Hello World string', () => {
  expect(helloWorld()).not.toBe('Hello World');
});

describe('sum function', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(2, 2)).toBe(4);
  });
  it('should return the sum of two numbers', () => {
    expect(sum(2, 2)).toEqual(4);
  });
});

describe('isOdddNumber function', () => {
  it('should return true if number is odd', () => {
    expect(isOddNumber(4)).toBe(true);
  });

  it('should return true if number is odd', () => {
    expect(isOddNumber(5)).toBe(false);
  });
});

describe('getUserFromApi function', () => {
  it('should return a user from api (Method 1)', async () => {
    const a = await getUserFromApi();
    expect(a).toMatchSnapshot();
  });

  it('should return a user from api (Method 2)', async () => {
    expect.assertions(1);
    await expect(getUserFromApi()).resolves.toMatchSnapshot();
  });
});

describe('api function', () => {
  it('should return a user from api case 1 (Mock)', async () => {
    expect.assertions(1);
    await expect(api(true)).resolves.toMatchSnapshot();
  });

  it('should return a user from api case 2 (Mock)', async () => {
    expect.assertions(1);
    await expect(api(true)).resolves.toMatchObject(userStub);
  });

  it('should return a user from api case 3 (Mock)', async () => {
    expect.assertions(1);
    await expect(api(true)).resolves.toMatchObject({
      id: expect.any(Number),
    });
  });

  it('should thrown an exception', async () => {
    expect.assertions(1);

    return api(false).catch((error) => {
      expect(error).toEqual(new MyCustomError());
    });
  });
});

test('Custom exception', () => {
  expect(() => customError()).toThrowError(new MyCustomError());
});

describe('createFile function', () => {
  it('should generate file successfully', () => {
    expect(() => createFile('filePath', 'fileContent')).not.toThrow();
  });

  it('should throw an exception when the file path is not provided', () => {
    expect(() => createFile('filePath', null))
      .toThrowError(new MyCustomError());
  });

  it('should throw an exception when the file content is not null', () => {
    expect(() => createFile(null, 'fileContent'))
      .toThrowError(new MyCustomError());
  });
});
