import { Pool } from 'pg'
import stageConfig from '../configs/main.config'
import DatabaseError from '../error/database.error'
import ErrorType from '../error/error.type'
import HttpStatusCode from '../error/error.status'
import LoggerService from '../services/logger.service'

const logger = new LoggerService('db/postgres').logger

const pool = new Pool({
  user: stageConfig.DB_USER,
  password: stageConfig.DB_PASSWORD,
  host: stageConfig.DB_HOST,
  port: stageConfig.DB_PORT,
  database: stageConfig.DATABASE,
  max: 10,
  connectionTimeoutMillis: 10000
})

pool.on('connect', () => {
  logger.info('DB is connected')
})

pool.on('remove', () => {
  logger.info('DB connection removed')
})

pool.on('error', (err) => {
  const e = new DatabaseError(
    ErrorType.DATABASE_ERROR,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    err.message,
    false,
    'Postgres DB'
  )
  logger.error(e)
})

export {
  pool
}
