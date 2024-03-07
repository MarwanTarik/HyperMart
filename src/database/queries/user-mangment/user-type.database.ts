import APIDatabaseError from '../../../error/database.error'
import Descriptions from '../../../error/descriptions.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import DatabaseSources from '../../db-source.database'
import { pool } from '../../main.database'

async function getUserTypeID (userType: string): Promise<string> {
  const query = `SELECT type_id 
                  FROM user_type 
                  WHERE type_name = $1;`

  const results = await pool.query(query, [
    userType
  ])

  if (results.rows === undefined) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.USER_TYPE_NOT_FOUND,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return results.rows[0].type_id as string
}

export {
  getUserTypeID
}
