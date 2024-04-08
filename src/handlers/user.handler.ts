import { disableUserController, enableUserController } from '../controllers/user.controller'
import { type Request, type Response, type NextFunction } from 'express'
import LoggerService from '../services/logging/logger.service'
import HttpStatusCode from '../error/error.status'
import UserStatus from '../model/user-manegment/user-status.model'

const logger = new LoggerService('handler/user').logger

async function enableUserHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const username = req.body.username as string
    await enableUserController(username)
    logger.info(`user with username ${username} had enabled`)
    res.status(HttpStatusCode.OK).json({
      username,
      status: UserStatus.ENABLED
    })
  } catch (e) {
    logger.error(e)
    const statusCode: number = (e?.httpStatusCode !== undefined) ? e.httpStatusCode : HttpStatusCode.INTERNAL_SERVER_ERROR
    res.status(statusCode).json(e)
  }
}

async function disableUserHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const username = req.body.username as string
    await disableUserController(username)
    logger.info(`user with username ${username} had disabled`)
    res.status(HttpStatusCode.OK).json({
      username,
      status: UserStatus.DISABLED
    })
  } catch (e) {
    logger.error(e)
    const statusCode: number = (e?.httpStatusCode !== undefined) ? e.httpStatusCode : HttpStatusCode.INTERNAL_SERVER_ERROR
    res.status(statusCode).json(e)
  }
}

export {
  enableUserHandler,
  disableUserHandler
}
