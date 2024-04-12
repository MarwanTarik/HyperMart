/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getOrderHandler, placeOrderHandler } from '../../handlers/order.handler'
import RequestValidators from '../../middlewares/validators/request-validators.middleware'

const router = Router()

const { ORDER_MANGEMENT } = RequestValidators

router
  .post('/order/place', ORDER_MANGEMENT.placeOrder, placeOrderHandler)
  .get('/order/:orderID', getOrderHandler)

export default router
