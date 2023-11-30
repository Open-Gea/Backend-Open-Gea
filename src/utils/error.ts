/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
export class BaseError extends Error {
  public readonly message: string;

  public readonly code: StatusCodes;

  public readonly description: string;

  constructor(message: string, code: StatusCodes, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.code = code;
    this.description = description;
    Error.captureStackTrace(this);
  }

  // Method that returns a JSON response of the error
  public toJSON() {
    return {
      message: this.message,
      code: this.code,
      description: this.description
    };
  }
}

export class ServerError extends BaseError {
  constructor(name: string, httpCode = StatusCodes.INTERNAL_SERVER_ERROR, description = 'internal server error') {
    super(name, httpCode, description);
  }
}

export class YvYError extends BaseError {
  constructor(name: string, httpCode = StatusCodes.BAD_REQUEST, description :string) {
    super(name, httpCode, description);
  }
}

export function isAnError(error: any): error is Error {
  return error instanceof Error;
}
