import type productDetail from '../../types/product/product-detail.type'

class OrderDetails {
  productDetails: productDetail[]

  constructor (productDetails: productDetail[]) {
    this.productDetails = productDetails
  }
}

export default OrderDetails
