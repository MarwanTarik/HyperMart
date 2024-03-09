/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import RequestValidators from '../../middlewares/validators/request-validators.middleware'
import { disableUserHandler, enableUserHandler } from '../../handlers/user.handler'

const router = Router()
const { userActivation } = RequestValidators

router
  .post('/user/enable', userActivation, enableUserHandler)
  .post('/user/disable', userActivation, disableUserHandler)

export default router
