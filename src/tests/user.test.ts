/* eslint-disable @typescript-eslint/no-unused-vars */

import { creatUser } from '../database/queries/user-mangment/user.database'
import { truncateTable } from '../database/truncate'
import Cities from '../model/user-manegment/cities.model'
import Countries from '../model/user-manegment/countries.model'
import { GroupsName } from '../model/user-manegment/groups.model'
import User from '../model/user-manegment/user.model'
import LoggerService from '../services/logger.service'
import { type NextFunction, type Request, type Response } from 'express'
import { disableUserHandler, enableUserHandler } from '../handlers/user.handler'
import UserStatus from '../model/user-manegment/user-status.model'
import HttpStatusCode from '../error/error.status'
import { pool } from '../database/main.database'

jest.mock('../services/logger.service', () => {
  const originalLoggerService = jest.requireActual('../services/logger.service').default
  return jest.fn(() => ({
    logger: {
      info: jest.fn(),
      error: jest.fn()
    }
  }))
})
const mockedLoggerService = LoggerService as jest.MockedClass<typeof LoggerService>

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
const groups = [GroupsName.USER]

describe('test changing user status', () => {
  const mockRequest = {
    body: {
      username: user.username
    }
  } as unknown as Request

  const mockResponse: Partial<Response> = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  }

  const mockNext: jest.MockedFunction<NextFunction> = jest.fn()

  beforeAll(async () => {
    await truncateTable('users')
    await creatUser(user, groups)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await pool.end()
  })

  it('test enableUserHandler return json object if user enabled successfully', async () => {
    await enableUserHandler(mockRequest, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json).toHaveBeenCalledWith({
      username: user.username,
      status: UserStatus.ENABLED
    })
  })

  it('test disableUserHandler return json object if user disabled successfully', async () => {
    await disableUserHandler(mockRequest, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json).toHaveBeenCalledWith({
      username: user.username,
      status: UserStatus.DISABLED
    })
  })
})
