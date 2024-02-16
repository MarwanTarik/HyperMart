import BaseError from './base.error'

class ExternalAPIError extends BaseError {
  source: string
  public constructor (name: string, httpStatusCode: number, description: string, isOperational: boolean, source: string) {
    super(name, httpStatusCode, description, isOperational)
    this.source = source
  }
}

export default ExternalAPIError
