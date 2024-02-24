class BaseError extends Error {
  type: string
  httpStatueCode: number
  description: string
  isOperational: boolean

  public constructor (type: string, httpStatusCode: number, description: string, isOperational: boolean) {
    super(description)
    this.type = type
    this.httpStatueCode = httpStatusCode
    this.description = description
    this.isOperational = isOperational
    Error.captureStackTrace(this)
  }
}

export default BaseError
