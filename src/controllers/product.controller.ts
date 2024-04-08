import { addProductDatabase, deleteProductDatabase, getAllSellerProductsDatabase, getProductDatabase, getSellerProductDatabase, listAllProductsDatabase, productSearchDatabase, updateProductDatabase } from '../database/queries/product-mangment/product.database'
import Product from '../model/product-mangement/product.model'

async function addProductController (product: Product): Promise<number> {
  return await addProductDatabase(product)
}

async function deleteProductController (productID: number, userID: number): Promise<void> {
  await deleteProductDatabase(productID, userID)
}

async function updateProductPriceController (price: number, productID: number, userID: number): Promise<void> {
  await updateProductDatabase(price, productID, userID)
}

async function getSellerProductController (productID: number, userID: number): Promise<Product> {
  const result = await getSellerProductDatabase(productID, userID)

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

  const products: Product[] = []
  result.rows.forEach((row) => {
    const {
      name,
      unit,
      price,
      description,
      quantity,
      category,
      id
    } = row

    const product = new Product(
      name as string,
      price as number,
      quantity as number,
      category as string,
      unit as string,
      description as string,
      userID,
      id as number
    )
    products.push(product)
  })

  return products
}

async function getProductController (productID: number): Promise<Product> {
  const result = await getProductDatabase(productID)

  const {
    name,
    unit,
    price,
    description,
    quantity,
    category,
    userid
  } = result.rows[0]

  const product = new Product(
    name as string,
    price as number,
    quantity as number,
    category as string,
    unit as string,
    description as string,
    userid as number,
    productID
  )
  return product
}

async function listAllProductsController (): Promise<Product[]> {
  const result = await listAllProductsDatabase()

  const products: Product[] = []
  result.rows.forEach((row) => {
    const {
      name,
      unit,
      price,
      description,
      quantity,
      category,
      userid,
      id
    } = row

    const product = new Product(
      name as string,
      price as number,
      quantity as number,
      category as string,
      unit as string,
      description as string,
      userid as number,
      id as number
    )
    products.push(product)
  })
  return products
}

async function productSearchController (productName: string): Promise<Product[]> {
  const result = await productSearchDatabase(productName)

  const products: Product[] = []
  result.rows.forEach((row) => {
    const {
      name,
      unit,
      price,
      description,
      quantity,
      category,
      userid,
      id
    } = row

    const product = new Product(
      name as string,
      price as number,
      quantity as number,
      category as string,
      unit as string,
      description as string,
      userid as number,
      id as number
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
