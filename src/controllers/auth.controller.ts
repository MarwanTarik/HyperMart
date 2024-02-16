import jwt, { type JwtPayload } from 'jsonwebtoken'
import stageConfig from '../configs/main.config'
import { type NextFunction, type Request, type Response } from 'express'
import APIError from '../error/api.error'
import errorType from '../error/error.type'
import httpStatusCode from '../error/error.status'

function generateAccessToken (userID: string): string {
  const secret = stageConfig.JWT_SECRET as string
  if (secret === undefined) {
    throw new APIError(
      errorType.API_ERROR,
      httpStatusCode.INTERNAL_SERVER_ERROR,
      'JWT Secret is undefined',
      true
    )
  }
  return jwt.sign(userID, secret, { expiresIn: '1800s' })
}

function authenticateToken (req: Request, _res: Response, _next: NextFunction): string | JwtPayload | undefined {
  const auth = req.headers.authorization
  if (auth === undefined) {
    throw new APIError(
      errorType.API_ERROR,
      httpStatusCode.UNOTHORIZED,
      'Authorization header not found',
      true
    )
  }
  const token = auth?.split(' ')[1]
  if (token === undefined) {
    throw new APIError(
      errorType.API_ERROR,
      httpStatusCode.UNOTHORIZED,
      'Authorization token not found',
      true
    )
  }
  return jwt.verify(token, stageConfig.JWT_SECRET as string)
}

export {
  generateAccessToken,
  authenticateToken
}
