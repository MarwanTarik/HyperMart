import DatabaseError from '../../../error/database.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import User from '../../../model/user-manegment/User.model'
import { type LogingCredentials } from '../../../types/login-credentials.type'
import { getDBPool } from '../../main.database'
import { getCityID } from './cities.database'
import { getCountryID } from './countries.database'

const pool = getDBPool()

async function creatUser (user: User): Promise<string> {
  const query = ` INSERT INTO users (first_name, last_name, email, city_id, country_id, phone_number, password_hash, active, address, username)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
  RETURNING user_id`

  const cityID = await getCityID(user.city)
  const countryID = await getCountryID(user.country)

  const result = await pool.query(query, [
    user.firstName,
    user.lastName,
    user.email,
    cityID,
    countryID,
    user.phoneNumber,
    user.hashedPassword,
    user.active,
    user.address,
    user.username
  ])

  return result.rows[0].user_id as string
}

async function getUser (username: string): Promise<User> {
  const query = `SELECT 
                      users.user_id, users.first_name, 
                      users.last_name, cities.name,
                      users.email, users.phone_number,
                      users.password_hash, users.active,
                      countries.name, user_type.type_name,
                      users.address
                  FROM 
                      users,                
                      INNER JOIN cities USING(city_id)
                      INNER JOIN countries USING(country_id)
                      INNER JOIN user_type USING(type_id)
                  WHERE username = $1;`

  const results = await pool.query(query, [username])
  const row = results.rows[0]

  if (row === undefined) {
    throw new DatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'username is not exist',
      true,
      'postgres'
    )
  }

  const user = new User(
    username,
    row.type as string,
    row.first_name as string,
    row.last_name as string,
    row.email as string,
    row.address as string,
    row.city as string,
    row.country as string,
    row.phone_number as string,
    row.password_hash as string,
    row.active as string
  )

  return user
}

async function getLoginCredentials (username: string): Promise<LogingCredentials> {
  const query = `SELECT user_id, password_hash
                  FROM 
                    USERS
                  WHERE 
                    username = $1;`
  const results = await pool.query(query, [username])
  const row = results.rows[0]

  if (row === undefined) {
    throw new DatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'username is not exist',
      true,
      'postgres'
    )
  }

  return {
    userID: row.user_id as string,
    passwordHash: row.password_hash as string
  }
}

export {
  creatUser,
  getUser,
  getLoginCredentials
}
