import { body } from 'express-validator'
import Cities from '../../model/user-manegment/cities.model'
import Countries from '../../model/user-manegment/countries.model'
import PhoneNumberChecker from './phone-number-checker.middleware'
import categories from '../../model/product-mangement/categories.model'
import units from '../../model/product-mangement/product-units.model'

const PASSWORD_RGX = /^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const checkers = {
  username: body('username')
    .exists()
    .isString()
    .notEmpty(),
  firstname: body('first-name')
    .exists()
    .isString()
    .notEmpty(),
  lastname: body('last-name')
    .exists()
    .isString()
    .notEmpty(),
  email: body('email')
    .exists()
    .isString()
    .notEmpty()
    .isEmail(),
  address: body('address')
    .exists()
    .isString()
    .notEmpty(),
  city: body('city')
    .exists()
    .isString()
    .notEmpty()
    .custom((city) => { return city in Cities }),
  country: body('country')
    .exists()
    .isString()
    .notEmpty()
    .custom((country) => { return country in Countries }),
  phonenumber: body('phone-number')
    .exists()
    .isString()
    .notEmpty()
    .custom(async (phoneNumber: string, { req }) => {
      const phoneChecker = new PhoneNumberChecker(phoneNumber, req.body.country as string)
      return await phoneChecker.checkPhoneNumber()
    }),
  password: body('password')
    .exists()
    .isString()
    .notEmpty()
    .matches(PASSWORD_RGX),
  productname: body('name')
    .exists()
    .isString()
    .notEmpty(),
  productPrice: body('pricePerUnit')
    .exists()
    .isNumeric()
    .notEmpty(),
  productQuantity: body('quantity')
    .exists()
    .isNumeric()
    .notEmpty(),
  productCategory: body('category')
    .exists()
    .isString()
    .notEmpty()
    .custom((category) => { return category in categories }),
  productUnit: body('unit')
    .exists()
    .isString()
    .notEmpty()
    .custom((unit) => { return unit in units }),
  productid: body('productID')
    .exists()
    .isNumeric()
    .notEmpty()
}

export default checkers
