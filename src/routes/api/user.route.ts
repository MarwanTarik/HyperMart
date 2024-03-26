/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import RequestValidators from '../../middlewares/validators/request-validators.middleware'
import { disableUserHandler, enableUserHandler } from '../../handlers/user.handler'

const router = Router()
const { USER_MANGMENT } = RequestValidators

router
  .post('/user/enable', USER_MANGMENT.userActivation, enableUserHandler)
  .post('/user/disable', USER_MANGMENT.userActivation, disableUserHandler)

export default router
