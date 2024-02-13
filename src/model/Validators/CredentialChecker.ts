import { getDBPool } from '../../database/main'
import Checker from './Checker'

class CredentialChecker extends Checker {
  role: string
  email: string
  hashedPassword: string

  constructor (role: string, email: string, hashedPassword: string) {
    super()
    this.role = role
    this.email = email
    this.hashedPassword = hashedPassword
  }

  async check (): Promise<boolean> {
    const valid = await this.checkCredentials()
    if (!valid) {
      return false
    }
    return await super.callNext()
  }

  async checkCredentials (): Promise<boolean> {
    const pool = getDBPool()
    const result = await pool.query(` SELECT EXISTS (
          SELECT 1 FROM Users WHERE password_hash = $1 AND role = $2 AND email = $3
      )`, [this.hashedPassword, this.role, this.email])

    const valid = result.fields[0].name
    if (valid === 'false') {
      return false
    }
    return true
  }
}

export default CredentialChecker
