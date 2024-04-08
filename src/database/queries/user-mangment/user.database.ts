import APIDatabaseError from '../../../error/database.error'
import Descriptions from '../../../error/descriptions.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import UserStatus from '../../../model/user-manegment/user-status.model'
import User from '../../../model/user-manegment/user.model'
import { type LoginCredentials } from '../../../types/auth/login-credentials.type'
import DatabaseSources from '../../db-source.database'
import { pool } from '../../main.database'

async function creatUser (user: User, groups: string[]): Promise<number> {
  const query = ` INSERT INTO users 
  (
    first_name, 
    last_name,
    email, 
    city_id, 
    country_id,
    phone_number,
    password_hash,
    active,
    address,
    username,
    type_id
  )
  VALUES (
    $1,
    $2,
    $3,
    (SELECT city_id FROM cities WHERE name = $4),
    (SELECT country_id FROM countries WHERE name = $5),
    $6,
    $7,
    $8,
    $9,
    $10, 
    (SELECT type_id FROM user_type WHERE type_name = $11)
  ) 
  RETURNING user_id`

  const result = await pool.query(query, [
    user.firstName,
    user.lastName,
    user.email,
    user.city,
    user.country,
    user.phoneNumber,
    user.hashedPassword,
    user.active,
    user.address,
    user.username,
    user.type
  ])

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      Descriptions.NEW_USER_CREATION_ERROR,
      false,
      DatabaseSources.POSTGRES
    )
  }
  const row = result.rows[0]
  await addUserGroups((row.user_id as number), groups)
  return row.user_id as number
}

async function getUser (email: string): Promise<User> {
  const query = `SELECT 
                    users.user_id,
                    users.username,
                    users.first_name, 
                    users.last_name, 
                    cities.name AS city_name,
                    users.phone_number,
                    users.password_hash, 
                    users.active,
                    countries.name AS country_name, 
                    user_type.type_name,
                    users.address
                  FROM 
                    users               
                    INNER JOIN cities ON users.city_id = cities.city_id
                    INNER JOIN countries ON users.country_id = countries.country_id
                    INNER JOIN user_type ON users.type_id = user_type.type_id
                  WHERE email = $1;`

  const results = await pool.query(query, [email])
  const row = results.rows[0]

  if (row === undefined) {
    throw new APIDatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.EMAIL_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }

  const user = new User(
    row.username as string,
    row.type_name as string,
    row.first_name as string,
    row.last_name as string,
    email,
    row.address as string,
    row.city_name as string,
    row.country_name as string,
    row.phone_number as string,
    row.password_hash as string,
    row.active as string,
    row.user_id as number
  )
  return user
}

async function getLoginCredentials (email: string): Promise<LoginCredentials> {
  const query = `SELECT user_id, password_hash, active
                  FROM users
                  WHERE email = $1;`
  const results = await pool.query(query, [email])

  if (results.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.EMAIL_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }
  const row = results.rows[0]
  const userID = row.user_id as number
  const passwordHash = row.password_hash as string
  const userStatus = row.active as string
  const groups = await getUserGroups(userID)

  return {
    userID,
    passwordHash,
    userStatus,
    groups
  }
}

async function addUserGroups (userID: number, groups: string[]): Promise<void> {
  const query = `INSERT INTO app_user_group (user_id, group_id)
  SELECT $1, group_id FROM app_groups WHERE group_name = ANY ($2);`
  await pool.query(query, [
    userID,
    groups
  ])
}

async function getUserGroups (userID: number): Promise<string[]> {
  const query = `SELECT group_name 
  FROM app_user_group
  INNER JOIN app_groups USING(group_id)
  WHERE user_id = $1;`

  const results = await pool.query(query, [
    userID
  ])

  if (results.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.USER_ID_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }

  const groups: string[] = []
  results.rows.forEach((row) => {
    groups.push(row.group_name as string)
  })
  return groups
}

async function updateUserGroups (userID: number, groupID: number): Promise<void> {
  const query = `UPDATE app_user_group
  SET group_id=$1
  WHERE user_id=$2`
  await pool.query(query, [
    groupID,
    userID
  ])
}

async function getUserID (username: string): Promise<string> {
  const query = `SELECT user_id
  FROM users
  WHERE username = $1`
  const result = await pool.query(query, [
    username
  ])

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.USER_NAME_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }
  const row = result.rows[0]
  return row.user_id
}

async function enableUser (username: string): Promise<void> {
  const query = `UPDATE users
                 SET active = $1
                 WHERE username = $2`

  const result = await pool.query(query, [
    UserStatus.ENABLED,
    username
  ])

  if (result.rowCount === 0) {
    throw new APIDatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.USER_NAME_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }
}

async function disableUser (username: string): Promise<void> {
  const query = `UPDATE users
                 SET active = $1
                 WHERE username = $2`

  const result = await pool.query(query, [
    UserStatus.DISABLED,
    username
  ])

  if (result.rowCount === 0) {
    throw new APIDatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.USER_NAME_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }
}

async function getUserStatus (username: string): Promise<string> {
  const query = `SELECT active 
                 FROM users
                 WHERE username = $1`
  const result = await pool.query(query, [
    username
  ])

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.USER_NAME_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }
  const row = result.rows[0]
  return row.active
}

export {
  creatUser,
  getUser,
  getLoginCredentials,
  addUserGroups,
  enableUser,
  disableUser,
  getUserStatus,
  updateUserGroups,
  getUserID
}
