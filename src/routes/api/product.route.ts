/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import RequestValidators from '../../middlewares/validators/request-validators.middleware'
import { addProductHandler, deleteProductHandler, getAllSellerProductsHandler, getProductHandler, getSellerProductHandler, listAllProductsHandler, productSearchHandler, updateProductPriceHandler } from '../../handlers/product.handler'

const router = Router()
const { PRODUCT_MANGEMENT } = RequestValidators

router
  .post('/product', PRODUCT_MANGEMENT.addProduct, addProductHandler)
  .delete('/product/:productID', PRODUCT_MANGEMENT.deleteProduct, deleteProductHandler)
  .put('/product/price/:productID', PRODUCT_MANGEMENT.updateProducrPrice, updateProductPriceHandler)
  .get('/product/seller/:productID', PRODUCT_MANGEMENT.getSellerProduct, getSellerProductHandler)
  .get('/products/seller', getAllSellerProductsHandler)
  .get('/product/:productID', PRODUCT_MANGEMENT.getProduct, getProductHandler)
  .get('/products', listAllProductsHandler)
  .get('/product/search/:productName', PRODUCT_MANGEMENT.search, productSearchHandler)

export default router
