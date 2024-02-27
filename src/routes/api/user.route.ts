/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginHandler, signupHandler } from '../../handlers/user.handler'

const router = Router()

router
  .post('/auth/signup', signupHandler)
  .post('/auth/login', loginHandler)

export default router
