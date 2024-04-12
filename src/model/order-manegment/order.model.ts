import type productDetail from '../../types/product/product-detail.type'
import Invoice from './invoice.model'
import OrderDetails from './order-details.model'

class Order {
  address: string
  shippingDate: Date
  orderStatus: number
  orderDetails: OrderDetails
  invoice: Invoice
  orderDate?: Date

  constructor (
    address: string,
    shippingDate: Date,
    orderStatus: number,
    delivaryCost: number,
    discount: number,
    productDetails: productDetail[]
  ) {
    this.address = address
    this.shippingDate = shippingDate
    this.orderStatus = orderStatus
    this.orderDetails = new OrderDetails(productDetails)

    let subtotal = 0
    this.orderDetails.productDetails.forEach((detail) => {
      subtotal += (detail.price * detail.quantity)
    })
    this.createInvocie(subtotal, delivaryCost, discount)
  }

  createInvocie (subtotal: number, delivaryCost: number, discount: number): void {
    this.invoice = new Invoice(subtotal, delivaryCost, discount)
    this.invoice.calcTotalPrice()
  }
}

export default Order
