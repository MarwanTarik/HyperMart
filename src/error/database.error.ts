import BaseError from './base.error'

class DatabaseError extends BaseError {
  DBSource: string
  public constructor (name: string, httpStatusCode: number, description: string, isOperational: boolean, DBSource: string) {
    super(name, httpStatusCode, description, isOperational)
    this.DBSource = DBSource
  }
}

export default DatabaseError
