/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginHandler, signupHandler } from '../../handlers/auth.handler'
import RequestValidators from '../../middlewares/validators/request-validators.middleware'

const router = Router()
const { USER_MANGMENT } = RequestValidators

router
  .post('/auth/signup', USER_MANGMENT.signup, signupHandler)
  .post('/auth/login', USER_MANGMENT.login, loginHandler)

export default router
