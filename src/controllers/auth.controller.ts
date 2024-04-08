import { type NextFunction, type Request, type Response } from 'express'
import User from '../model/user-manegment/user.model'
import { creatUser, getLoginCredentials } from '../database/queries/user-mangment/user.database'
import { comparePassword, hashPassword } from '../utils/hash.utils'
import APIError from '../error/api.error'
import ErrorType from '../error/error.type'
import HttpStatusCode from '../error/error.status'
import { generateAccessToken } from '../utils/auth.utils'
import UserType from '../model/user-manegment/user-type.model'
import { GroupsName } from '../model/user-manegment/groups.model'
import UserStatus from '../model/user-manegment/user-status.model'
import Descriptions from '../error/descriptions.error'

async function signupController (req: Request, _res: Response, _next: NextFunction): Promise<string> {
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
  const userType = req.body.type as string
  const groups: string[] = setGroups(userType)
  const userID = await creatUser(user, groups)

  if (userID === null) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.SIGNUP_FAILED,
      true
    )
  }
  return generateAccessToken(userID, groups)
}

async function loginController (req: Request, _res: Response, _next: NextFunction): Promise<string> {
  const email = req.body.email as string
  const password = req.body.password as string

  const credentials = await getLoginCredentials(email)
  const validpassword = await comparePassword(password, credentials.passwordHash)

  if (!validpassword) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.PASSWORD_INVALID,
      true
    )
  }

  if (credentials.userStatus === UserStatus.DISABLED) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.UNATHORIZED,
      Descriptions.USER_DISABLED,
      true
    )
  }
  return generateAccessToken(credentials.userID, credentials.groups)
}

function setGroups (userType: string): string[] {
  const groups: string[] = []
  if (userType === UserType.CUSTOMER) {
    groups.push(GroupsName.USER)
    groups.push(GroupsName.CUSTOMER)
  } else if (userType === UserType.SELLER) {
    groups.push(GroupsName.USER)
    groups.push(GroupsName.SELLER)
  }
  return groups
}

export {
  signupController,
  loginController,
  setGroups
}
