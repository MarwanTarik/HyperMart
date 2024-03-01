import DatabaseError from '../../../error/database.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import User from '../../../model/user-manegment/user.model'
import { type LogingCredentials } from '../../../types/login-credentials.type'
import { pool } from '../../main.database'
import { getCityID } from './cities.database'
import { getCountryID } from './countries.database'

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
  return result.rows[0].user_id
}

async function getUser (email: string): Promise<User> {
  const query = `SELECT 
                      users.user_id, users.first_name, 
                      users.last_name, cities.name,
                      users.phone_number,
                      users.password_hash, users.active,
                      countries.name, user_type.type_name,
                      users.address
                  FROM 
                      users,                
                      INNER JOIN cities USING(city_id)
                      INNER JOIN countries USING(country_id)
                      INNER JOIN user_type USING(type_id)
                  WHERE email = $1;`

  const results = await pool.query(query, [email])
  const row = results.rows[0]

  if (row === undefined) {
    throw new DatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'email is not exist',
      true,
      'postgres'
    )
  }

  const user = new User(
    row.username as string,
    row.type as string,
    row.first_name as string,
    row.last_name as string,
    email,
    row.address as string,
    row.city as string,
    row.country as string,
    row.phone_number as string,
    row.password_hash as string,
    row.active as string
  )
  return user
}

async function getLoginCredentials (email: string): Promise<LogingCredentials> {
  const query = `SELECT user_id, password_hash
                  FROM USERS
                  WHERE email = $1;`

  const results = await pool.query(query, [email])
  const row = results.rows[0]

  if (row === undefined) {
    throw new DatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'email is not exist',
      true,
      'postgres'
    )
  }

  const userID = row.user_id as string
  const passwordHash = row.password_hash
  const groups = await getUserGroups(userID)

  return {
    userID,
    passwordHash,
    groups
  }
}

async function addUserGroup (userID: string, groups: string[]): Promise<void> {
  const query = `INSERT INTO app_user_group (user_id, group_id)
  SELECT $1, group_id FROM app_groups WHERE group_name = ANY ($2);`

  await pool.query(query, [
    userID,
    groups
  ])
}

async function getUserGroups (userID: string): Promise<string[]> {
  const query = `SELECT group_name 
  FROM app_user_group
  INNER JOIN app_groups USING(group_id)
  WHERE user_id = $1;`

  const results = await pool.query(query, [
    userID
  ])

  const row = results.rows[0]
  if (row === undefined) {
    throw new DatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'user id is not exist',
      true,
      'postgres'
    )
  }
  const groups = row.group_name
  return groups
}

// async function activateUser(username: string) {
//   const query =  `UPDATE users`
// }

export {
  creatUser,
  getUser,
  getLoginCredentials,
  addUserGroup
}
