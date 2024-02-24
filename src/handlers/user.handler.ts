import { type Request, type Response, type NextFunction } from 'express'
import { signup } from '../controllers/user.controller'
import type User from '../model/user-manegment/User.model'
import LoggerService from '../services/logger.service'

const loggerService = new LoggerService('/api/user')

async function signupHandler (req: Request<unknown, unknown, User>, res: Response, _next: NextFunction): Promise<void> {
  try {
    const token = await signup(req, res, _next)
    loggerService.logger.info('token created successfully')
    res.status(200).json(token)
  } catch (e) {
    loggerService.logger.error(e)
    res.status(500).send(e)
  }
}

export {
  signupHandler
}
