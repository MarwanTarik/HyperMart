class Product {
  name: string
  price: number
  quantity: number
  category: string
  unit: string
  description: string
  ID: number
  userID: number

  constructor (
    name: string,
    price: number,
    quantity: number,
    category: string,
    unit: string,
    description: string,
    userID?: number,
    ID?: number
  ) {
    this.name = name
    this.price = price
    this.quantity = quantity
    this.category = category
    this.unit = unit
    this.description = description
    this.ID = ID ?? -1
    this.userID = userID ?? -1
  }
}

export default Product
