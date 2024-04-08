import { type NextFunction, type Request, type Response } from 'express'
import Cities from '../model/user-manegment/cities.model'
import Countries from '../model/user-manegment/countries.model'
import User from '../model/user-manegment/user.model'
import { loginHandler, signupHandler } from '../handlers/auth.handler'
import HttpStatusCode from '../error/error.status'
import { setGroups } from '../controllers/auth.controller'

jest.mock('../database/queries/user-mangment/user.database', () => ({
  ...jest.requireActual('../database/queries/user-mangment/user.database'),
  creatUser: jest.fn(() => user.ID),
  getLoginCredentials: jest.fn(() => {
    return {
      userID: user.ID,
      passwordHash: user.hashedPassword,
      userStatus: user.active,
      groups
    }
  })
}))

jest.mock('../utils/hash.utils', () => ({
  ...jest.requireActual('../utils/hash.utils'),
  comparePassword: jest.fn(() => true)
}))

jest.mock('../services/logging/logger.service', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    logger: {
      info: jest.fn(),
      error: jest.fn()
    }
  }))
}))

const mockResponse: Partial<Response> = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis()
}

const mockNext: jest.MockedFunction<NextFunction> = jest.fn()

const user = new User(
  'starlight',
  'customer',
  'marwan',
  'tarik',
  'a@gmail.com',
  'address',
  Cities.GIZA,
  Countries.EGYPT,
  '011xxxxxxxx',
  'werrftgkj',
  'enabled',
  1
)

const groups = setGroups(user.type)

describe('test auth endpoints', () => {
  it('test signup', async () => {
    const mockRequest = {
      body: {
        username: user.username,
        type: user.type,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        city: user.city,
        country: user.country,
        phoneNumber: user.phoneNumber,
        password: user.hashedPassword,
        active: user.active
      }
    } as unknown as Request

    await signupHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
  })

  it('test login', async () => {
    const mockRequest = {
      body: {
        username: user.email,
        password: user.hashedPassword
      }
    } as unknown as Request

    await loginHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
  })
})
