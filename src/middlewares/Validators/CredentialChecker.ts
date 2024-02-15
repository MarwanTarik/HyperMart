import { getDBPool } from '../../database/main'

class CredentialChecker {
  role: string
  email: string
  hashedPassword: string

  constructor (role: string, email: string, hashedPassword: string) {
    this.role = role
    this.email = email
    this.hashedPassword = hashedPassword
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
