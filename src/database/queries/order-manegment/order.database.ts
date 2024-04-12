import APIError from '../../../error/api.error'
import Descriptions from '../../../error/descriptions.error'
import HttpStatusCode from '../../../error/error.status'
import ErrorType from '../../../error/error.type'
import Order from '../../../model/order-manegment/order.model'
import type productDetail from '../../../types/product/product-detail.type'
import { pool } from '../../main.database'

async function placeOrderDatabase (order: Order): Promise<void> {
  const insertOrder = `
      WITH inserted_invoice AS (
        INSERT INTO invoice (subtotal, delivary_cost, discount, total)
        VALUES ($1, $2, $3, $4)
        RETURNING invoice_id
    ),
    inserted_order_status AS (
        INSERT INTO order_status (status_code)
        VALUES ($7)
        RETURNING order_status_id
    ),
    inserted_orders AS (
        INSERT INTO orders (invoice_id, address, shipping_date, order_status_id)
        SELECT invoice_id, $5, $6, order_status_id
        FROM inserted_invoice, inserted_order_status
        RETURNING order_id
    )
    INSERT INTO order_details (order_id, product_id, quantity)
      SELECT order_id, product_id, quantity
      FROM (
          SELECT order_id, unnest($8::int[]) AS product_id, unnest($9::int[]) AS quantity
          FROM inserted_orders
      ) AS order_details;
  `
  const updateProductsQuantities = 'SELECT * FROM update_products_quantities($1, $2);'

  const quantities: number[] = []
  const productIds: number[] = []

  order.orderDetails.productDetails.forEach((detail) => {
    productIds.push(detail.productID)
    quantities.push(detail.quantity)
  })

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query({
      text: updateProductsQuantities,
      values: [productIds, quantities]
    })

    await client.query(insertOrder, [
      order.invoice.subtotal,
      order.invoice.delivaryCost,
      order.invoice.discount,
      order.invoice.totalPrice,
      order.address,
      order.shippingDate,
      order.orderStatus,
      productIds,
      quantities
    ])
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

async function getOrderDatabase (orderId: number): Promise<Order> {
  const getOrderQuery = `
  SELECT 
    orders.address,
    orders.shipping_date AS shippingdate, 
    invoice.subtotal AS subtotal,
    invoice.delivary_cost AS delivarycost,
    invoice.discount AS discount,
    order_status.status_code AS statuscode
  FROM orders
  INNER JOIN invoice ON orders.invoice_id = invoice.invoice_id
  INNER JOIN order_status ON orders.order_status_id = order_status.order_status_id
  WHERE orders.order_id = $1;
  `

  const getOrderDetailsQuery = `
  SELECT
    order_details.product_id as productid,
    order_details.quantity,
    products.price_per_unit as price
  FROM order_details
  INNER JOIN products ON products.id = order_details.product_id
  WHERE order_id = $1;
  `

  const orderResult = await pool.query(getOrderQuery, [
    orderId
  ])

  const orderDetailsResult = await pool.query(getOrderDetailsQuery, [
    orderId
  ])

  if (orderResult.rows.length === 0 || orderDetailsResult.rows.length === 0) {
    throw new APIError(
      ErrorType.REQUEST_BODY_ERROR,
      HttpStatusCode.NOT_FOUND,
      Descriptions.INVALID_ORDER_ID,
      true
    )
  }

  const {
    address,
    shippingdate,
    delivarycost,
    discount,
    statuscode
  } = orderResult.rows[0]

  const productDetails: productDetail[] = []
  orderDetailsResult.rows.forEach((row) => {
    const { productid, quantity, price } = row
    productDetails.push({ productID: productid, quantity, price })
  })

  console.log(productDetails)

  const order = new Order(
    address as string,
    shippingdate as Date,
    statuscode as number,
    delivarycost as number,
    discount as number,
    productDetails
  )

  return order
}

export {
  placeOrderDatabase,
  getOrderDatabase
}
