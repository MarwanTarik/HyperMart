import { type JwtPayload } from 'jsonwebtoken'

interface AuthPayload extends JwtPayload {
  userID: number
  groups: string[]
}

export type {
  AuthPayload
}
