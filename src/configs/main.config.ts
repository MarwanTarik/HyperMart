import development from './development.config'
import 'dotenv/config'

const appConfigs = new Map()
appConfigs.set('development', development)

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'
const stage = process.env.STAGE

const {
  PORT,
  DB_HOST,
  DB_PASSWORD,
  DATABASE,
  DB_USER,
  DB_PORT,
  PHONENUMBER_API_KEY,
  JWT_SECRET,
  SALT,
  LOGS_FILE_PATH
} = appConfigs.get(stage)

const stageConfig = {
  stage,
  PORT,
  DB_HOST,
  DB_PASSWORD,
  DATABASE,
  DB_USER,
  DB_PORT,
  PHONENUMBER_API_KEY,
  JWT_SECRET,
  SALT,
  LOGS_FILE_PATH
}

export default stageConfig
