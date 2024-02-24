/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, type NextFunction } from 'express'
import { signup } from '../../controllers/user.controller'
import type User from '../../model/user-manegment/User.model'

const router = Router()

const x = async (req: Request<unknown, unknown, User>, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const token = await signup(req, res, _next)
    res.status(200).json(token)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

router.post('/signup', x)

export default router
