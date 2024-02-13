import 'dotenv/config'

const environment = process.env

const development = {
  PORT: environment.PORT,
  DB_PORT: environment.DB_PORT,
  DB_USER: environment.DB_USER,
  DB_PASSWORD: environment.DB_PASSWORD,
  DB_HOST: environment.DB_HOST,
  DATABASE: environment.DATABASE,
  PHONENUMBER_API_KEY: environment.PHONENUMBER_API_KEY
}

export default development
