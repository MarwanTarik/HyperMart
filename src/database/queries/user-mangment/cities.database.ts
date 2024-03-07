import APIDatabaseError from '../../../error/database.error'
import Descriptions from '../../../error/descriptions.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import DatabaseSources from '../../db-source.database'
import { pool } from '../../main.database'

async function getCityID (cityName: string): Promise<string | undefined> {
  const query = `SELECT city_id 
                  FROM cities 
                  WHERE name = $1`

  const result = await pool.query(query, [cityName])
  const row = result.rows[0]

  if (row === undefined) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.CITY_NAME_ERROR,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return row.city_id
}

export {
  getCityID
}
