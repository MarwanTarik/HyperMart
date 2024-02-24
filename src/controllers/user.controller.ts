import { type NextFunction, type Request, type Response } from 'express'
import User from '../model/user-manegment/User.model'
import { creatUser } from '../database/queries/user-mangment/user.database'
import { hashPassword } from '../utils/hash.utils'
import APIError from '../error/api.error'
import ErrorType from '../error/error.type'
import HttpStatusCode from '../error/error.status'
import { generateAccessToken } from './auth.controller'

async function signup (req: Request<unknown, unknown, User>, res: Response, _next: NextFunction): Promise<string> {
  const user = new User(
    req.body.type,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.address,
    req.body.city,
    req.body.country,
    req.body.phoneNumber,
    await hashPassword(req.body.hashedPassword),
    req.body.active
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

export {
  signup
}
