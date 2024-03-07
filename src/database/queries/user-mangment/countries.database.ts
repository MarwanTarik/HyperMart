import APIDatabaseError from '../../../error/database.error'
import Descriptions from '../../../error/descriptions.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import DatabaseSources from '../../db-source.database'
import { pool } from '../../main.database'

async function getCountryID (countryName: string): Promise<string | undefined> {
  const query = `SELECT country_id 
                  FROM countries 
                  WHERE name = $1`
  const result = await pool.query(query, [countryName])
  const row = result.rows[0]

  if (row === undefined) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.COUNTRY_NAME_ERROR,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return row.country_id
}

export {
  getCountryID
}
