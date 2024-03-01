/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginHandler, signupHandler } from '../../handlers/auth.handler'
import RequestValidators from '../../middlewares/validators/request-validators.middleware'

const router = Router()
const { signup, login } = RequestValidators

router
  .post('/auth/signup', signup, signupHandler)
  .post('/auth/login', login, loginHandler)

export default router
