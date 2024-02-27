import { type Request, type Response, type NextFunction } from 'express'
import { login, signup } from '../controllers/user.controller'
import LoggerService from '../services/logger.service'
import HttpStatusCode from '../error/error.status'

const logger = new LoggerService('/api/user').logger

async function signupHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const token = await signup(req, res, _next)
    logger.info('sign up succed')
    res.status(200).json(token)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.UNATHORIZED).send({
      details: e.detail,
      timeStamp: e.timestamp,
      level: e.level
    })
  }
}

async function loginHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const token = await login(req, res, _next)
    logger.info('login succed')
    res.status(200).json(token)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.UNATHORIZED).json(e)
  }
}

export {
  signupHandler,
  loginHandler
}
