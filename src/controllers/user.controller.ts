import { type NextFunction, type Request, type Response } from 'express'
import User from '../model/user-manegment/User.model'
import { creatUser, getLoginCredentials } from '../database/queries/user-mangment/user.database'
import { comparePassword, hashPassword } from '../utils/hash.utils'
import APIError from '../error/api.error'
import ErrorType from '../error/error.type'
import HttpStatusCode from '../error/error.status'
import { generateAccessToken } from '../utils/auth.utils'

async function signup (req: Request, _res: Response, _next: NextFunction): Promise<string> {
  const user = new User(
    req.body.username as string,
    req.body.type as string,
    req.body.firstName as string,
    req.body.lastName as string,
    req.body.email as string,
    req.body.address as string,
    req.body.city as string,
    req.body.country as string,
    req.body.phoneNumber as string,
    await hashPassword(req.body.password as string),
    req.body.active as string
  )

  const userID = await creatUser(user)

  if (userID === null) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'signup feiled',
      true
    )
  }
  return generateAccessToken(userID)
}

async function login (req: Request, _res: Response, _next: NextFunction): Promise<string> {
  const username = req.body.username as string
  const password = req.body.password as string

  if (username === undefined) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'username not found in the request body',
      true
    )
  }

  if (password === undefined) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'passwprd not found in the request body',
      true
    )
  }

  const credentials = await getLoginCredentials(username)
  const validpassword = await comparePassword(password, credentials.passwordHash)

  if (!validpassword) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      'password is not valid',
      true
    )
  }

  return generateAccessToken(credentials.userID)
}

export {
  signup,
  login
}
