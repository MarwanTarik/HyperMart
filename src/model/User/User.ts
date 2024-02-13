const role = {
  customer: 'customer',
  seller: 'seller'
}

class User {
  private ID: string
  private role: string
  private firstName: string
  private lastName: string
  private email: string
  private address: string
  private city: string
  private country: string
  private phoneNumber: string
  private hashedPassword: string

  getID (): string {
    return this.ID
  }

  setID (ID: string): void {
    this.ID = ID
  }

  getRole (): string {
    return this.role
  }

  setRole (role: string): void {
    this.role = role
  }

  getFirstName (): string {
    return this.firstName
  }

  setFirstName (firstName: string): void {
    this.firstName = firstName
  }

  getLastName (): string {
    return this.lastName
  }

  setLastName (lastName: string): void {
    this.lastName = lastName
  }

  getEmail (): string {
    return this.email
  }

  setAEmail (email: string): void {
    this.email = email
  }

  getAddress (): string {
    return this.address
  }

  setAddress (address: string): void {
    this.address = address
  }

  getCity (): string {
    return this.city
  }

  setCity (city: string): void {
    this.city = city
  }

  getCountry (): string {
    return this.country
  }

  setCountry (country: string): void {
    this.country = country
  }

  getPhoneNumber (): string {
    return this.phoneNumber
  }

  setPhoneNumber (phoneNumber: string): void {
    this.phoneNumber = phoneNumber
  }

  getHashedPassword (): string {
    return this.hashedPassword
  }

  setHashedPassword (hashedPassword: string): void {
    this.hashedPassword = hashedPassword
  }
}

export {
  User,
  role
}
