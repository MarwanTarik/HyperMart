import { type Request, type Response, type NextFunction } from 'express'
import LoggerService from '../services/logger.service'
import HttpStatusCode from '../error/error.status'
import Product from '../model/product-mangement/product.model'
import { addProductController, deleteProductController, getAllSellerProductsController, getProductController, getSellerProductController, listAllProductsController, productSearchController, updateProductPriceController } from '../controllers/product.controller'
import { authenticateToken, checkRole } from '../utils/auth.utils'
import { GroupsName } from '../model/user-manegment/groups.model'
import Roles from '../model/user-manegment/roles.models'
import APIError from '../error/api.error'
import ErrorType from '../error/error.type'
import Descriptions from '../error/descriptions.error'

const logger = new LoggerService('handler/product').logger

async function addProductHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.SELLER, Roles.ADD_PRODUCT)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }
    const product = new Product(
      req.body.name as string,
      req.body.pricePerUnit as number,
      req.body.quantity as number,
      req.body.category as string,
      req.body.unit as string,
      req.body.description as string,
      userID
    )
    await addProductController(product)
    logger.info(`seller with id ${userID} add new product with name ${req.body.name} added`)
    res.send(HttpStatusCode.OK)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

async function deleteProductHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const productID = req.body.productID as number
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.SELLER, Roles.DELETE_PRODUCT)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }
    await deleteProductController(productID, userID)
    logger.info(`seller ${userID} delete product with id ${productID}`)
    res.send(HttpStatusCode.OK)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

async function updateProductPriceHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const price = req.body.price as number
    const productID = req.body.productID as number
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.SELLER, Roles.UPDATE_PRODUCT_PRICE)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }
    await updateProductPriceController(price, productID, userID)
    logger.info(`seller ${userID} change product ${productID} price`)
    res.send(HttpStatusCode.OK)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

async function getSellerProductHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const productID = req.body.productID as number
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.SELLER, Roles.GET_PRODUCT)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }
    const product = await getSellerProductController(productID, userID)
    logger.info(`product with id ${productID} had quried`)
    res.status(HttpStatusCode.OK).json(product)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

async function getAllSellerProductsHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const { userID, groups } = authenticateToken(req, res, _next)
    const products = await getAllSellerProductsController(userID)
    if (!checkRole(groups, GroupsName.SELLER, Roles.GET_PRODUCT)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }
    logger.info(`All products of the seller with id ${userID} had queried`)
    res.status(HttpStatusCode.OK).json(products)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

async function getProductHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const productID = req.body.productID as number
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.SELLER, Roles.GET_PRODUCT)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }
    const product = await getProductController(productID)
    logger.info(`user ${userID} get product with id ${productID}`)
    res.status(HttpStatusCode.OK).json(product)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

async function listAllProductsHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.CUSTOMER, Roles.GET_PRODUCT)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }
    const products = await listAllProductsController()
    logger.info(`user with id ${userID} had queried all products`)
    res.status(HttpStatusCode.OK).json(products)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

async function productSearchHandler (req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const { userID, groups } = authenticateToken(req, res, _next)
    if (!checkRole(groups, GroupsName.CUSTOMER, Roles.SEARCH_PRODUCT)) {
      throw new APIError(
        ErrorType.AUTH_ERROR,
        HttpStatusCode.UNATHORIZED,
        Descriptions.UNUTHORIZED_REQUEST,
        true
      )
    }
    const productName = req.body.productName as string
    const product = await productSearchController(productName)
    logger.info(`user with id ${userID} searched on product ${productName}`)
    res.status(HttpStatusCode.OK).json(product)
  } catch (e) {
    logger.error(e)
    res.status(HttpStatusCode.BAD_REQUEST).json(e)
  }
}

export {
  addProductHandler,
  deleteProductHandler,
  updateProductPriceHandler,
  getSellerProductHandler,
  getAllSellerProductsHandler,
  getProductHandler,
  listAllProductsHandler,
  productSearchHandler
}
