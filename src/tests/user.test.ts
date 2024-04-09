import { type NextFunction, type Request, type Response } from 'express'
import { disableUserHandler, enableUserHandler } from '../handlers/user.handler'
import UserStatus from '../model/user-manegment/user-status.model'
import HttpStatusCode from '../error/error.status'

jest.mock('../database/queries/user-manegment/user.database', () => ({
  ...jest.requireActual('../database/queries/user-manegment/user.database'),
  enableUser: jest.fn(),
  disableUser: jest.fn()
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

const username = 'starlight'

describe('test changing user status', () => {
  it('test enableUserHandler return json object if user enabled successfully', async () => {
    const mockRequest = {
      body: {
        username
      }
    } as unknown as Request

    await enableUserHandler(mockRequest, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json).toHaveBeenCalledWith({
      username,
      status: UserStatus.ENABLED
    })
  })

  it('test disableUserHandler return json object if user disabled successfully', async () => {
    const mockRequest = {
      body: {
        username
      }
    } as unknown as Request

    await disableUserHandler(mockRequest, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json).toHaveBeenCalledWith({
      username,
      status: UserStatus.DISABLED
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })
})
