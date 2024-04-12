class Invoice {
  subtotal: number
  delivaryCost: number
  discount: number
  totalPrice: number

  constructor (subtotal: number, delivaryCost: number, discount: number) {
    this.subtotal = subtotal
    this.delivaryCost = delivaryCost
    this.discount = discount
  }

  calcTotalPrice (): void {
    this.totalPrice = this.subtotal + this.delivaryCost
    this.totalPrice -= (Math.floor(this.totalPrice * (this.discount / 100)))
  }
}

export default Invoice
