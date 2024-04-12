import { type NextFunction, type Request, type Response } from 'express'
import Order from '../model/order-manegment/order.model'
import shippmentStatus from '../model/order-manegment/shippment-status.mode'
import * as authUtils from '../utils/auth.utils'
import { GroupsName } from '../model/user-manegment/groups.model'
import { getOrderHandler, placeOrderHandler } from '../handlers/order.handler'
import HttpStatusCode from '../error/error.status'

const authenticateTokenSpy = jest.spyOn(authUtils, 'authenticateToken')

jest.mock('../database/queries/order-manegment/order.database', () => ({
  ...jest.requireActual('../database/queries/order-manegment/order.database'),
  placeOrderDatabase: jest.fn()
}))

jest.mock('../database/queries/product-manegment/product.database', () => ({
  ...jest.requireActual('../database/queries/product-manegment/product.database'),
  getProductsPricesDatabase: jest.fn(() => {
    return (
      [
        order.orderDetails.productDetails[0].price,
        order.orderDetails.productDetails[1].price
      ]
    )
  })
}))

jest.mock('../controllers/order.controller', () => ({
  ...jest.requireActual('../controllers/order.controller'),
  getOrderController: jest.fn(() => order)
}))

jest.mock('../services/logging/logger.service', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    logger: {
      info: jest.fn(),
      error: jest.fn()
    }
  }))
}))

const mockResponse: Partial<Response> = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis()
}

const mockNext: jest.MockedFunction<NextFunction> = jest.fn()

const userID = 1
const order = new Order(
  'cairo',
  new Date('3-11-2024'),
  shippmentStatus.PENDING,
  10,
  5,
  [
    {
      productID: 1,
      quantity: 5,
      price: 10
    },
    {
      productID: 2,
      quantity: 10,
      price: 20
    }
  ]
)

describe('test order endponts', () => {
  it('test place order', async () => {
    const groups = [GroupsName.USER, GroupsName.CUSTOMER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID,
        groups
      }
    })

    const mockRequest = {
      body: {
        products: order.orderDetails.productDetails,
        address: order.address,
        shippingDate: order.shippingDate,
        delivaryCost: order.invoice.delivaryCost,
        discount: order.invoice.discount
      }
    } as unknown as Request

    await placeOrderHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
  })

  it('test get order', async () => {
    const groups = [GroupsName.USER, GroupsName.CUSTOMER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID,
        groups
      }
    })

    const mockRequest = {
      params: {
        orderID: 1
      }
    } as unknown as Request

    await getOrderHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith(order)
  })
})
