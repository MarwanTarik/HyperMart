import { body, checkExact } from 'express-validator'
import { Cities, Countries, Roles } from '../../model/User/User'
import PhoneNumberChecker from './PhoneNumberChecke'

const RequestValidators = {
  SIGNUP: [
    checkExact([
      body('role')
        .isString()
        .notEmpty()
        .custom((role) => { return role in Roles }),
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
        .matches(/^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ])
  ],
  LOGIN: [
    checkExact([
      body('email')
        .isString()
        .notEmpty()
        .isEmail(),
      body('passord')
        .isString()
        .notEmpty()
        .matches(/^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ])
  ]
}

export default RequestValidators
