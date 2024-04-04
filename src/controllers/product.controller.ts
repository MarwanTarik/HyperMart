import { addProductDatabase, deleteProductDatabase, getAllSellerProductsDatabase, getProductDatabase, getSellerProductDatabase, listAllProductsDatabase, productSearchDatabase, updateProductDatabase } from '../database/queries/product-mangment/product.database'
import APIError from '../error/api.error'
import Descriptions from '../error/descriptions.error'
import HttpStatusCode from '../error/error.status'
import ErrorType from '../error/error.type'
import Product from '../model/product-mangement/product.model'

async function addProductController (product: Product): Promise<number> {
  return await addProductDatabase(product)
}

async function deleteProductController (productID: number, userID: number): Promise<void> {
  const affectedRowCount = await deleteProductDatabase(productID, userID)
  if (affectedRowCount === null) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true
    )
  }
}

async function updateProductPriceController (price: number, productID: number, userID: number): Promise<void> {
  const affectedRowCount = await updateProductDatabase(price, productID, userID)
  if (affectedRowCount === null) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true
    )
  }
}

async function getSellerProductController (productID: number, userID: number): Promise<Product> {
  const result = await getSellerProductDatabase(productID, userID)
  if (result.rows.length === 0) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true
    )
  }

  const {
    name,
    unit,
    price,
    description,
    quantity,
    category
  } = result.rows[0]

  const product = new Product(
    name as string,
    price as number,
    quantity as number,
    category as string,
    unit as string,
    description as string,
    userID,
    productID
  )
  return product
}

async function getAllSellerProductsController (userID: number): Promise<Product[]> {
  const result = await getAllSellerProductsDatabase(userID)

  if (result.rows.length === 0) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true
    )
  }

  const products: Product[] = []

  result.rows.forEach((row) => {
    const {
      name,
      unit,
      price,
      description,
      quantity,
      category,
      ID
    } = row

    const product = new Product(
      name as string,
      price as number,
      quantity as number,
      category as string,
      unit as string,
      description as string,
      userID,
      ID as number
    )
    products.push(product)
  })

  return products
}

async function getProductController (productID: number): Promise<Product> {
  const result = await getProductDatabase(productID)

  if (result.rows.length === 0) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true
    )
  }

  const {
    name,
    unit,
    price,
    description,
    quantity,
    category,
    userID
  } = result.rows[0]

  const product = new Product(
    name as string,
    price as number,
    quantity as number,
    category as string,
    unit as string,
    description as string,
    userID as number,
    productID
  )
  return product
}

async function listAllProductsController (): Promise<Product[]> {
  const result = await listAllProductsDatabase()
  if (result.rows.length === 0) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true
    )
  }

  const products: Product[] = []

  result.rows.forEach((row) => {
    const {
      name,
      unit,
      price,
      description,
      quantity,
      category,
      userID,
      ID
    } = row

    const product = new Product(
      name as string,
      price as number,
      quantity as number,
      category as string,
      unit as string,
      description as string,
      userID as number,
      ID as number
    )
    products.push(product)
  })
  return products
}

async function productSearchController (productName: string): Promise<Product[]> {
  const result = await productSearchDatabase(productName)
  if (result.rows.length === 0) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true
    )
  }

  const products: Product[] = []

  result.rows.forEach((row) => {
    const {
      name,
      unit,
      price,
      description,
      quantity,
      category,
      userID,
      ID
    } = row

    const product = new Product(
      name as string,
      price as number,
      quantity as number,
      category as string,
      unit as string,
      description as string,
      userID as number,
      ID as number
    )
    products.push(product)
  })
  return products
}

export {
  addProductController,
  deleteProductController,
  updateProductPriceController,
  getSellerProductController,
  getAllSellerProductsController,
  getProductController,
  listAllProductsController,
  productSearchController
}
