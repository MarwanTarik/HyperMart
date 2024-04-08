import { type Request, type Response, type NextFunction } from 'express'
import { loginController, signupController } from '../controllers/auth.controller'
import LoggerService from '../services/logging/logger.service'
import HttpStatusCode from '../error/error.status'

const logger = new LoggerService('auth/handler').logger

async function signupHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const token = await signupController(req, res, _next)
    logger.info(`user with username ${req.body.username} had signed up`)
    res.status(HttpStatusCode.OK).json(token)
  } catch (e) {
    logger.error(e)
    const statusCode: number = (e?.httpStatusCode !== undefined) ? e.httpStatusCode : HttpStatusCode.INTERNAL_SERVER_ERROR
    res.status(statusCode).json(e)
  }
}

async function loginHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const token = await loginController(req, res, _next)
    logger.info(`user with email ${req.body.email} had loged in`)
    res.status(HttpStatusCode.OK).json(token)
  } catch (e) {
    logger.error(e)
    const statusCode: number = (e?.httpStatusCode !== undefined) ? e.httpStatusCode : HttpStatusCode.INTERNAL_SERVER_ERROR
    res.status(statusCode).json(e)
  }
}

export {
  signupHandler,
  loginHandler
}
