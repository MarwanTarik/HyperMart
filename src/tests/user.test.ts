import Cities from '../model/user-manegment/cities.model'
import Countries from '../model/user-manegment/countries.model'
import User from '../model/user-manegment/user.model'
import { type NextFunction, type Request, type Response } from 'express'
import { disableUserHandler, enableUserHandler } from '../handlers/user.handler'
import UserStatus from '../model/user-manegment/user-status.model'
import HttpStatusCode from '../error/error.status'

jest.mock('../database/queries/user-mangment/user.database', () => ({
  ...jest.requireActual('../database/queries/user-mangment/user.database'),
  enableUser: jest.fn(),
  disableUser: jest.fn()
}))

jest.mock('../services/logger.service', () => ({
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

describe('test changing user status', () => {
  it('test enableUserHandler return json object if user enabled successfully', async () => {
    const mockRequest = {
      body: {
        username: user.username
      }
    } as unknown as Request

    await enableUserHandler(mockRequest, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json).toHaveBeenCalledWith({
      username: user.username,
      status: UserStatus.ENABLED
    })
  })

  it('test disableUserHandler return json object if user disabled successfully', async () => {
    const mockRequest = {
      body: {
        username: user.username
      }
    } as unknown as Request

    await disableUserHandler(mockRequest, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json).toHaveBeenCalledWith({
      username: user.username,
      status: UserStatus.DISABLED
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })
})
