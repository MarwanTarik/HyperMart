import BaseError from './base.error'

class APIError extends BaseError {
  public constructor (type: string, httpStatusCode: number, description: string, isOperational: boolean) {
    super(type, httpStatusCode, description, isOperational)
  }
}

export default APIError
