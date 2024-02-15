import 'dotenv/config'

const environment = process.env

const development = {
  PORT: environment.DEV_PORT,
  DB_PORT: environment.DEV_DB_PORT,
  DB_USER: environment.DEV_DB_USER,
  DB_PASSWORD: environment.DEV_DB_PASSWORD,
  DB_HOST: environment.DEV_DB_HOST,
  DATABASE: environment.DEV_DATABASE,
  PHONENUMBER_API_KEY: environment.PHONENUMBER_API_KEY
}

export default development
