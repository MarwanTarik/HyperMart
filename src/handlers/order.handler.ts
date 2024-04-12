import { type Request, type Response, type NextFunction } from 'express'
import APIError from '../error/api.error'
import Descriptions from '../error/descriptions.error'
import HttpStatusCode from '../error/error.status'
import ErrorType from '../error/error.type'
import { GroupsName } from '../model/user-manegment/groups.model'
import Roles from '../model/user-manegment/roles.models'
import { authenticateToken, checkRole } from '../utils/auth.utils'
import LoggerService from '../services/logging/logger.service'
import { getOrderController, placeOrderController } from '../controllers/order.controller'
import shippmentStatus from '../model/order-manegment/shippment-status.mode'
import type productDetail from '../types/product/product-detail.type'

const logger = new LoggerService('handler/order').logger

async function placeOrderHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.CUSTOMER, Roles.PLACE_ORDER)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }

    await placeOrderController(
      req.body.address as string,
      new Date(req.body.shippingDate as string),
      req.body.delivaryCost as number,
      req.body.discount as number,
      shippmentStatus.PENDING,
      req.body.products as productDetail[]
    )

    logger.info(`customer with id ${userID} place order`)
    res.status(HttpStatusCode.OK).end()
  } catch (e) {
    logger.error(e)
    const statusCode: number = (e?.httpStatusCode !== undefined) ? e.httpStatusCode : HttpStatusCode.INTERNAL_SERVER_ERROR
    res.status(statusCode).json(e.message)
  }
}

async function getOrderHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.CUSTOMER, Roles.PLACE_ORDER)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }

    const orderID = Number(req.params.orderID)
    const order = await getOrderController(orderID)

    logger.info(`customer with id ${userID} get order ${JSON.stringify(order)}`)
    res.status(HttpStatusCode.OK).json(order)
  } catch (e) {
    logger.error(e)
    const statusCode: number = (e?.httpStatusCode !== undefined) ? e.httpStatusCode : HttpStatusCode.INTERNAL_SERVER_ERROR
    res.status(statusCode).json(e)
  }
}

export {
  placeOrderHandler,
  getOrderHandler
}
