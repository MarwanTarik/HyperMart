import { body, checkExact } from 'express-validator'
import Cities from '../../model/user-manegment/cities.model'
import Countries from '../../model/user-manegment/countries.model'
import PhoneNumberChecker from './phone-number-checker.middleware'

const PASSWORD_RGX = /^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const RequestValidators = {
  signup: [
    checkExact([
      body('username')
        .isString()
        .notEmpty(),
      body('first-name')
        .isString()
        .notEmpty(),
      body('last-name')
        .isString()
        .notEmpty(),
      body('email')
        .isString()
        .notEmpty()
        .isEmail(),
      body('address')
        .isString()
        .notEmpty(),
      body('city')
        .isString()
        .notEmpty()
        .custom((city) => { return city in Cities }),
      body('country')
        .isString()
        .notEmpty()
        .custom((country) => { return country in Countries }),
      body('phone-number')
        .isString()
        .notEmpty()
        .custom(async (phoneNumber: string, { req }) => {
          const phoneChecker = new PhoneNumberChecker(phoneNumber, req.body.country as string)
          return await phoneChecker.checkPhoneNumber()
        }),
      body('password')
        .isString()
        .notEmpty()
        .matches(PASSWORD_RGX)
    ])
  ],
  login: [
    checkExact([
      body('email')
        .isString()
        .notEmpty()
        .isEmail(),
      body('password')
        .isString()
        .notEmpty()
        .matches(PASSWORD_RGX)
    ])
  ]
}

export default RequestValidators
