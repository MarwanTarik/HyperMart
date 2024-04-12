import Order from '../model/order-manegment/order.model'
import { getOrderDatabase, placeOrderDatabase } from '../database/queries/order-manegment/order.database'
import type productDetail from '../types/product/product-detail.type'
import { getProductsPricesDatabase } from '../database/queries/product-manegment/product.database'

async function placeOrderController (
  address: string,
  shippingDate: Date,
  delivaryCost: number,
  discount: number,
  shippmentStatus: number,
  productDetails: productDetail[]
): Promise<void> {
  const productIds: number[] = []
  productDetails.forEach((detail) => {
    productIds.push(detail.productID)
  })

  const productsPrices = await getProductsPricesDatabase(productIds)
  for (let i = 0; i < productsPrices.length; i++) {
    productDetails[i].price = productsPrices[i]
  }

  const order = new Order(
    address,
    shippingDate,
    shippmentStatus,
    delivaryCost,
    discount,
    productDetails
  )

  await placeOrderDatabase(order)
}

async function getOrderController (orderID: number): Promise<Order> {
  return await getOrderDatabase(orderID)
}

export {
  placeOrderController,
  getOrderController
}
