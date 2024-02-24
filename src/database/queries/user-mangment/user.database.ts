import type User from '../../../model/user-manegment/User.model'
import { getDBPool } from '../../main.database'
import { getCityID } from './cities.database'
import { getCountryID } from './countries.database'

async function creatUser (user: User): Promise<string> {
  const query = ` INSERT INTO users (first_name, last_name, email, city_id, country_id, phone_number, password_hash, active, address)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
  RETURNING user_id`

  const pool = getDBPool()

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
    user.address
  ])

  return result.rows[0].user_id as string
}

export {
  creatUser
}
