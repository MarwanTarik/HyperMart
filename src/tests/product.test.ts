import Product from '../model/product-mangement/product.model'
import { addProductHandler, deleteProductHandler, getAllSellerProductsHandler, getProductHandler, getSellerProductHandler, listAllProductsHandler, productSearchHandler, updateProductPriceHandler } from '../handlers/product.handler'
import { type NextFunction, type Request, type Response } from 'express'
import HttpStatusCode from '../error/error.status'
import { GroupsName } from '../model/user-manegment/groups.model'
import * as authUtils from '../utils/auth.utils'
import categories from '../model/product-mangement/categories.model'
import units from '../model/product-mangement/product-units.model'

const authenticateTokenSpy = jest.spyOn(authUtils, 'authenticateToken')

jest.mock('../database/queries/product-mangment/product.database', () => ({
  ...jest.requireActual('../database/queries/product-mangment/product.database'),
  addProductDatabase: jest.fn(() => product.ID),
  deleteProductDatabase: jest.fn(),
  updateProductDatabase: jest.fn(),
  getSellerProductDatabase: jest.fn(() => {
    return (
      {
        rows: [
          product
        ]
      }
    )
  }),
  getAllSellerProductsDatabase: jest.fn(() => {
    return (
      {
        rows: [
          product
        ]
      }
    )
  }),
  getProductDatabase: jest.fn(() => {
    return (
      {
        rows: [
          product
        ]
      }
    )
  }),
  listAllProductsDatabase: jest.fn(() => {
    return (
      {
        rows: [
          product
        ]
      }
    )
  }),
  productSearchDatabase: jest.fn(() => {
    return (
      {
        rows: [
          product
        ]
      }
    )
  })
}))

jest.mock('../services/logger.service', () => ({
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

const product = new Product(
  'spiro',
  10,
  10,
  categories.FOOD,
  units.LITRE,
  'soda',
  1,
  1
)

describe('test product endpoints', () => {
  it('test add new product', async () => {
    const groups = [GroupsName.USER, GroupsName.SELLER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID: product.userID,
        groups
      }
    })

    const mockRequest = {
      body: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        unit: product.unit,
        description: product.description
      }
    } as unknown as Request

    await addProductHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith({
        ID: product.ID,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        unit: product.unit,
        description: product.description,
        userID: product.userID
      })
  })

  it('test delete product', async () => {
    const groups = [GroupsName.USER, GroupsName.SELLER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID: product.userID,
        groups
      }
    })

    const mockRequest = {
      params: {
        productID: product.ID
      }
    } as unknown as Request

    await deleteProductHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith({
        productID: product.ID
      })
  })

  it('test update product price', async () => {
    const groups = [GroupsName.USER, GroupsName.SELLER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID: product.userID,
        groups
      }
    })

    const newPrice = 30
    const mockRequest = {
      body: {
        price: newPrice
      },
      params: {
        productID: product.ID
      }
    } as unknown as Request

    await updateProductPriceHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith({
        productID: product.ID,
        price: newPrice
      })
  })

  it('test get seller product', async () => {
    const groups = [GroupsName.USER, GroupsName.SELLER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID: product.userID,
        groups
      }
    })

    const mockRequest = {
      params: {
        productID: product.ID
      }
    } as unknown as Request

    await getSellerProductHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith(product)
  })

  it('test get All Seller Products', async () => {
    const groups = [GroupsName.USER, GroupsName.SELLER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID: product.userID,
        groups
      }
    })

    const mockRequest = {
    } as unknown as Request

    await getAllSellerProductsHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith([
        product
      ])
  })

  it('test customer get product', async () => {
    const groups = [GroupsName.USER, GroupsName.CUSTOMER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID: product.userID,
        groups
      }
    })

    const mockRequest = {
      params: {
        productID: product.ID
      }
    } as unknown as Request

    await getProductHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith(product)
  })

  it('test customer list all products', async () => {
    const groups = [GroupsName.USER, GroupsName.CUSTOMER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID: product.userID,
        groups
      }
    })

    const mockRequest = {
    } as unknown as Request

    await listAllProductsHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith([
        product
      ])
  })

  it('test search product by name', async () => {
    const groups = [GroupsName.USER, GroupsName.CUSTOMER]

    authenticateTokenSpy.mockImplementation((_req, _res, _next) => {
      return {
        userID: product.userID,
        groups
      }
    })

    const mockRequest = {
      params: {
        productName: product.name
      }
    } as unknown as Request

    await productSearchHandler(mockRequest, mockResponse as Response, mockNext)

    expect(mockResponse.status)
      .toHaveBeenCalledWith(HttpStatusCode.OK)
    expect(mockResponse.json)
      .toHaveBeenCalledWith([
        product
      ])
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })
})
