import jwt from 'jsonwebtoken'
import stageConfig from '../configs/main.config'
import { type NextFunction, type Request, type Response } from 'express'
import APIError from '../error/api.error'
import errorType from '../error/error.type'
import httpStatusCode from '../error/error.status'
import { type AuthPayload } from '../types/jwt-payload.type'
import { GroupsCredentials } from '../model/user-manegment/groups.model'

function generateAccessToken (userID: number, groups: string[]): string {
  const secret = stageConfig.JWT_SECRET as string
  if (secret === undefined) {
    throw new APIError(
      errorType.API_ERROR,
      httpStatusCode.INTERNAL_SERVER_ERROR,
      'JWT Secret is undefined',
      true
    )
  }
  return jwt.sign({ userID, groups }, secret, { expiresIn: '5000s' })
}

function authenticateToken (req: Request, _res: Response, _next: NextFunction): AuthPayload {
  const auth = req.headers.authorization
  if (auth === undefined) {
    throw new APIError(
      errorType.API_ERROR,
      httpStatusCode.UNATHORIZED,
      'Authorization header not found',
      true
    )
  }
  const token = auth?.split(' ')[1]
  if (token === undefined) {
    throw new APIError(
      errorType.API_ERROR,
      httpStatusCode.UNATHORIZED,
      'Authorization token not found',
      true
    )
  }
  return jwt.verify(token, stageConfig.JWT_SECRET as string) as AuthPayload
}

function checkRole (groups: string[], groupName: string, role: string): boolean {
  if (groups.includes(groupName)) {
    return GroupsCredentials[groupName].includes(role)
  }
  return false
}

export {
  generateAccessToken,
  authenticateToken,
  checkRole
}
