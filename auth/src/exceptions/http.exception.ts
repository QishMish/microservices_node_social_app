import logger from "../config/Logger";

class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    logger.error({ message, status});
  }
}

export default HttpException;
