import { pool } from '../../main.database'

async function getCityID (cityName: string): Promise<string | undefined> {
  const query = `SELECT city_id 
                  FROM cities 
                  WHERE name = $1`
  const result = await pool.query(query, [cityName])
  return result.rows[0].city_id
}

export {
  getCityID
}
