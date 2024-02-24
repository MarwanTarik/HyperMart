import { getDBPool } from '../../main.database'

async function getCountryID (countryName: string): Promise<string | undefined> {
  const query = `SELECT country_id 
                  FROM countries 
                  WHERE name = $1`
  const pool = getDBPool()
  const result = await pool.query(query, [countryName])
  return result.rows[0].country_id
}

export {
  getCountryID
}
