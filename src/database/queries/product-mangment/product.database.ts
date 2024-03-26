import { type QueryResult } from 'pg'
import type Product from '../../../model/product-mangement/product.model'
import { pool } from '../../main.database'
import APIDatabaseError from '../../../error/database.error'
import Descriptions from '../../../error/descriptions.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import DatabaseSources from '../../db-source.database'

async function addProductDatabase (product: Product): Promise<void> {
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
    )`
  const result = await pool.query(query, [
    product.unit,
    product.name,
    product.pricePerUnit,
    product.description,
    product.quantity,
    product.category,
    product.userID
  ])

  if (result === undefined) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
}

async function deleteProductDatabase (productID: number, userID: number): Promise<number | null> {
  const query = `DELETE FROM products 
  WHERE id = $1 and  user_id = $2`
  const result = await pool.query(query, [
    productID,
    userID
  ])

  if (result === undefined) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }

  return result.rowCount
}

async function updateProductDatabase (price: number, productID: number, userID: number): Promise<number | null> {
  const query = `UPDATE products
  SET price_per_unit = $1
  WHERE id = $2 and user_id = $3`
  const result = await pool.query(query, [
    price,
    productID,
    userID
  ])

  if (result === undefined) {
    throw new APIDatabaseError(
      ErrorType.DATABASE_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_PRODUCT,
      true,
      DatabaseSources.POSTGRES
    )
  }
  return result.rowCount
}

async function getSellerProductDatabase (productID: number, userID: number): Promise<QueryResult> {
  const query = `SELECT name,
  product_units.unit as unit,
  price_per_nuit as pricePerUnit,
  description,
  quantity,
  categories.name as categoryName
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

  if (result === undefined) {
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
  const query = `SELECT name,
  product_units.unit as unit,
  price_per_nuit as pricePerUnit,
  description,
  quantity,
  categories.name as categoryName
  FROM products
  INNER JOIN product_units 
  ON products.unit_id = product_units.id
  INNER JOIN categories
  ON products.category_id = categories.id
  WHERE user_id = $2
  `
  const result = await pool.query(query, [
    userID
  ])

  if (result === undefined) {
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
  const query = `SELECT name,
  product_units.unit as unit,
  price_per_nuit as pricePerUnit,
  description,
  quantity,
  categories.name as categoryName
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

  if (result === undefined) {
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
  const query = `SELECT name,
  product_units.unit as unit,
  price_per_nuit as pricePerUnit,
  description,
  quantity,
  categories.name as categoryName
  FROM products
  INNER JOIN product_units 
  ON products.unit_id = product_units.id
  INNER JOIN categories
  ON products.category_id = categories.id
  `
  const result = await pool.query(query)

  if (result === undefined) {
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
  const query = `SELECT name,
  product_units.unit as unit,
  price_per_nuit as pricePerUnit,
  description,
  quantity,
  categories.name as categoryName
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

  if (result === undefined) {
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

export {
  addProductDatabase,
  deleteProductDatabase,
  updateProductDatabase,
  getSellerProductDatabase,
  getAllSellerProductsDatabase,
  getProductDatabase,
  listAllProductsDatabase,
  productSearchDatabase
}
