import { body } from 'express-validator'
import Cities from '../../model/user-manegment/cities.model'
import Countries from '../../model/user-manegment/countries.model'
import PhoneNumberChecker from './phone-number-checker.middleware'

const PASSWORD_RGX = /^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const RequestValidators = {
  signup: [
    body('username')
      .exists()
      .isString()
      .notEmpty(),
    body('first-name')
      .exists()
      .isString()
      .notEmpty(),
    body('last-name')
      .exists()
      .isString()
      .notEmpty(),
    body('email')
      .exists()
      .isString()
      .notEmpty()
      .isEmail(),
    body('address')
      .exists()
      .isString()
      .notEmpty(),
    body('city')
      .exists()
      .isString()
      .notEmpty()
      .custom((city) => { return city in Cities }),
    body('country')
      .exists()
      .isString()
      .notEmpty()
      .custom((country) => { return country in Countries }),
    body('phone-number')
      .exists()
      .isString()
      .notEmpty()
      .custom(async (phoneNumber: string, { req }) => {
        const phoneChecker = new PhoneNumberChecker(phoneNumber, req.body.country as string)
        return await phoneChecker.checkPhoneNumber()
      }),
    body('password')
      .exists()
      .isString()
      .notEmpty()
      .matches(PASSWORD_RGX)
  ],
  login: [
    body('email')
      .exists()
      .isString()
      .notEmpty()
      .isEmail(),
    body('password')
      .exists()
      .isString()
      .notEmpty()
      .matches(PASSWORD_RGX)
  ],
  userActivation: [
    body('username')
      .exists()
      .isString()
      .notEmpty()
  ]
}

export default RequestValidators
