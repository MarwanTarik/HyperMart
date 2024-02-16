class BaseError extends Error {
  name: string
  httpStatueCode: number
  description: string
  isOperational: boolean

  public constructor (name: string, httpStatusCode: number, description: string, isOperational: boolean) {
    super(description)
    this.name = name
    this.httpStatueCode = httpStatusCode
    this.description = description
    this.isOperational = isOperational
    Error.captureStackTrace(this)
  }
}

export default BaseError
