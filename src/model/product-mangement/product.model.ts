class Product {
  name: string
  pricePerUnit: number
  quantity: number
  category: string
  unit: string
  description: string
  ID: number
  userID: number

  constructor (
    name: string,
    pricePerUnit: number,
    quantity: number,
    category: string,
    unit: string,
    description: string,
    ID?: number,
    userID?: number
  ) {
    this.name = name
    this.pricePerUnit = pricePerUnit
    this.quantity = quantity
    this.category = category
    this.unit = unit
    this.description = description
    this.ID = ID ?? -1
    this.userID = userID ?? -1
  }
}

export default Product
