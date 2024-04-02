import { type Request, type Response, type NextFunction } from 'express'
import { loginController, signupController } from '../controllers/auth.controller'
import LoggerService from '../services/logger.service'
import HttpStatusCode from '../error/error.status'

const logger = new LoggerService('auth/handler').logger

async function signupHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const token = await signupController(req, res, _next)
    logger.info('sign up successd')
    res.status(HttpStatusCode.OK).json(token)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.UNATHORIZED).json(e)
  }
}

async function loginHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const token = await loginController(req, res, _next)
    logger.info('login succed')
    res.status(HttpStatusCode.OK).json(token)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.UNATHORIZED).json(e)
  }
}

export {
  signupHandler,
  loginHandler
}
