class User {
  ID: string
  username: string
  type: string
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  country: string
  phoneNumber: string
  hashedPassword: string
  active: string
  password: string

  constructor (
    username: string,
    type: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    country: string,
    phoneNumber: string,
    hashedPassword: string,
    active: string
  ) {
    this.username = username
    this.type = type
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.address = address
    this.city = city
    this.country = country
    this.phoneNumber = phoneNumber
    this.hashedPassword = hashedPassword
    this.active = active
  }
}

export default User
