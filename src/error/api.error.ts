import BaseError from './base.error'

class APIError extends BaseError {
  public constructor (name: string, httpStatusCode: number, description: string, isOperational: boolean) {
    super(name, httpStatusCode, description, isOperational)
  }
}

export default APIError
