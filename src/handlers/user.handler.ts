import { disableUserController, enableUserController } from '../controllers/user.controller'
import { type Request, type Response, type NextFunction } from 'express'
import LoggerService from '../services/logger.service'
import HttpStatusCode from '../error/error.status'

const logger = new LoggerService('handler/user').logger

async function enableUserHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const username = req.body.username as string
    await enableUserController(username)
    logger.info(`user ${username} enabled`)
    res.status(HttpStatusCode.OK).json({
      username,
      status: 'enabled'
    })
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

async function disableUserHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const username = req.body.username as string
    await disableUserController(username)
    logger.info(`user ${username} disabled`)
    res.status(HttpStatusCode.OK).json({
      username,
      status: 'disabled'
    })
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

export {
  enableUserHandler,
  disableUserHandler
}
