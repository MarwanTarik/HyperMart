import jwt, { type JwtPayload } from 'jsonwebtoken'
import stageConfig from '../configs/main'
import { type NextFunction, type Request, type Response } from 'express'

function generateAccessToken (userID: string): string {
  return jwt.sign(userID, stageConfig.JWT_SECRET as string, { expiresIn: '1800s' })
}

function authenticateToken (req: Request, res: Response, next: NextFunction): string | JwtPayload {
  const auth = req.headers.authorization
  const token = auth?.split(' ')[1]

  if (token === undefined) {
    throw new Error('auth header noth found')
  }

  return jwt.verify(token, stageConfig.JWT_SECRET as string)
}

export {
  generateAccessToken,
  authenticateToken
}
