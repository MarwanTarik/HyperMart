/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { signupHandler } from '../../handlers/user.handler'

const router = Router()

router.post('/signup', signupHandler)

export default router
