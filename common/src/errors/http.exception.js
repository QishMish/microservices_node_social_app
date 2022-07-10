class HttpException extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  const throwHttpException = (statusCode, message) => {
    throw new HttpException(statusCode, message);
  };
  
  module.exports = {
    HttpException,
    throwHttpException,
  };
  