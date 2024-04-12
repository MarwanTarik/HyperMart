import { type QueryResult } from 'pg'
import type Product from '../../../model/product-manegment/product.model'
import { pool } from '../../main.database'
import APIDatabaseError from '../../../error/database.error'
import Descriptions from '../../../error/descriptions.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import DatabaseSources from '../../db-source.database'
import APIError from '../../../error/api.error'

async function addProductDatabase (product: Product): Promise<number> {
  const query = `INSERT INTO products(
    unit_id,
    name,
    price_per_unit,
    description,
    quantity,
    category_id,
    user_id
  )
  VALUES(
      (SELECT id FROM product_units WHERE unit = $1), 
      $2,
      $3,
      $4,
      $5,
      (SELECT id FROM categories WHERE name = $6),
      $7
    )
  RETURNING id`
  const result = await pool.query(query, [
    product.unit,
    product.name,
    product.price,
    product.description,
    product.quantity,
    product.category,
    product.userID
  ])

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return result.rows[0].id
}

async function deleteProductDatabase (productID: number, userID: number): Promise<void> {
  const query = `DELETE FROM products 
  WHERE id = $1 and user_id = $2`
  const result = await pool.query(query, [
    productID,
    userID
  ])
  console.log(result.rowCount)
  if (result.rowCount === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
}

async function updateProductDatabase (price: number, productID: number, userID: number): Promise<void> {
  const query = `UPDATE products
  SET price_per_unit = $1
  WHERE id = $2 and user_id = $3`
  const result = await pool.query(query, [
    price,
    productID,
    userID
  ])

  if (result.rowCount === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
}

async function getSellerProductDatabase (productID: number, userID: number): Promise<QueryResult> {
  const query = `SELECT products.name,
  product_units.unit as unit,
  products.price_per_unit as price,
  products.description,
  products.quantity,
  categories.name as category
  FROM products
  INNER JOIN product_units 
  ON products.unit_id = product_units.id
  INNER JOIN categories
  ON products.category_id = categories.id
  WHERE products.id = $1 and user_id = $2
  `
  const result = await pool.query(query, [
    productID,
    userID
  ])

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return result
}

async function getAllSellerProductsDatabase (userID: number): Promise<QueryResult> {
  const query = `SELECT products.id as id,
  products.name,
  product_units.unit as unit,
  products.price_per_unit as price,
  products.description,
  products.quantity,
  categories.name as category
  FROM products
  INNER JOIN product_units 
  ON products.unit_id = product_units.id
  INNER JOIN categories
  ON products.category_id = categories.id
  WHERE user_id = $1
  `
  const result = await pool.query(query, [
    userID
  ])

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return result
}

async function getProductDatabase (productID: number): Promise<QueryResult> {
  const query = `SELECT products.user_id as userid,
  products.name,
  product_units.unit as unit,
  products.price_per_unit as price,
  products.description,
  products.quantity,
  categories.name as category
  FROM products
  INNER JOIN product_units 
  ON products.unit_id = product_units.id
  INNER JOIN categories
  ON products.category_id = categories.id
  WHERE products.id = $1
  `
  const result = await pool.query(query, [
    productID
  ])

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return result
}

async function listAllProductsDatabase (): Promise<QueryResult> {
  const query = `SELECT products.user_id as userid,
  products.id as id,
  products.name,
  product_units.unit as unit,
  products.price_per_unit as price,
  products.description,
  products.quantity,
  categories.name as category
  FROM products
  INNER JOIN product_units 
  ON products.unit_id = product_units.id
  INNER JOIN categories
  ON products.category_id = categories.id
  `
  const result = await pool.query(query)

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return result
}

async function productSearchDatabase (productName: string): Promise<QueryResult> {
  const query = `SELECT products.user_id as userid,
  products.id as id,
  products.name,
  product_units.unit as unit,
  products.price_per_unit as price,
  products.description,
  products.quantity,
  categories.name as category
  FROM products
  INNER JOIN product_units 
  ON products.unit_id = product_units.id
  INNER JOIN categories
  ON products.category_id = categories.id
  WHERE products.name = $1
  `
  const result = await pool.query(query, [
    productName
  ])

  if (result.rows.length === 0) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return result
}

async function getProductsPricesDatabase (productIds: number[]): Promise<number[]> {
  const query = `
  SELECT price_per_unit as price
  FROM products
  WHERE id = ANY($1)
`

  const result = await pool.query(query, [
    productIds
  ])

  if (result.rows.length < productIds.length) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.BAD_REQUEST,
      Descriptions.INVALID_PRODUCT,
      true
    )
  }

  const productPrices: number[] = []
  result.rows.forEach((row) => {
    productPrices.push(row.price as number)
  })

  return productPrices
}

export {
  addProductDatabase,
  deleteProductDatabase,
  updateProductDatabase,
  getSellerProductDatabase,
  getAllSellerProductsDatabase,
  getProductDatabase,
  listAllProductsDatabase,
  productSearchDatabase,
  getProductsPricesDatabase
}
