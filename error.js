class MyCustomError extends Error {
  constructor() {
    super();
    this.message = 'This is my custom error';
  }
}

export default MyCustomError;
