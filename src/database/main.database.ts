import { Pool } from 'pg'
import stageConfig from '../configs/main.config'
import DatabaseError from '../error/database.error'
import ErrorType from '../error/error.type'
import HttpStatusCode from '../error/error.status'

const pool = new Pool({
  user: stageConfig.DB_USER,
  password: stageConfig.DB_PASSWORD,
  host: stageConfig.DB_HOST,
  port: stageConfig.DB_PORT,
  database: stageConfig.DATABASE,
  max: 10,
  connectionTimeoutMillis: 10000
})

function getDBPool (): Pool {
  return pool
}

pool.on('connect', () => {
  console.log('DB is connected')
})

pool.on('remove', () => {
  console.log('DB connection removed')
})

pool.on('error', (err) => {
  console.log(JSON.stringify(
    new DatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      err.message,
      false,
      'Postgres DB'
    )
  ))
})

export {
  getDBPool
}
