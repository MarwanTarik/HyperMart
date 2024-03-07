import APIDatabaseError from '../../../error/database.error'
import Descriptions from '../../../error/descriptions.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import User from '../../../model/user-manegment/user.model'
import { type LoginCredentials } from '../../../types/login-credentials.type'
import DatabaseSources from '../../db-source.database'
import { pool } from '../../main.database'
import { getCityID } from './cities.database'
import { getCountryID } from './countries.database'
import { getUserTypeID } from './user-type.database'

async function creatUser (user: User, groups: string[]): Promise<string> {
  const query = ` INSERT INTO users 
  (first_name, 
    last_name,
    email, 
    city_id, 
    country_id,
    phone_number,
    password_hash,
    active,
    address,
    username,
    type_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
  RETURNING user_id`

  const cityID = await getCityID(user.city)
  const countryID = await getCountryID(user.country)
  const typeID = await getUserTypeID(user.type)

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
    user.username,
    typeID
  ])
  const row = result.rows[0]

  if (row === undefined) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      Descriptions.NEW_USER_CREATION_ERROR,
      false,
      DatabaseSources.POSTGRES
    )
  }
  await addUserGroups((row.user_id as number), groups)
  return row.user_id as string
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
  const query = `SELECT user_id, password_hash
                  FROM users
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

  const userID = row.user_id as number
  const passwordHash = row.password_hash
  const groups = await getUserGroups(userID)

  return {
    userID,
    passwordHash,
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
  const row = results.rows[0]

  if (row === undefined) {
    throw new APIDatabaseError(
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

async function updateUserGroups (userID: number, groupID: number): Promise<void> {
  const query = `UPDATE app_user_group
  SET group_id=$1
  WHERE user_id=$2`
  await pool.query(query, [
    groupID,
    userID
  ])
}

async function enableUser (username: string): Promise<void> {
  const query = `UPDATE users
                 SET active = enabled
                 WHERE username = ${username}`
  await pool.query(query, [
    username
  ])
}

async function disableUser (username: string): Promise<void> {
  const query = `UPDATE users
                 SET active = disabled
                 WHERE username = ${username}`
  await pool.query(query, [
    username
  ])
}

async function getUserStatus (username: string): Promise<string> {
  const query = `SELECT active 
                 FROM users
                 WHERE username = $1`
  const result = await pool.query(query, [
    username
  ])
  const row = result.rows[0]

  if (row === undefined) {
    throw new APIDatabaseError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.USER_NAME_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }
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
  updateUserGroups
}
