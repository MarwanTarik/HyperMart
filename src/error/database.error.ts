import BaseError from './base.error'

class DatabaseError extends BaseError {
  DBSource: string
  public constructor (type: string, httpStatusCode: number, description: string, isOperational: boolean, DBSource: string) {
    super(type, httpStatusCode, description, isOperational)
    this.DBSource = DBSource
  }
}

export default DatabaseError
