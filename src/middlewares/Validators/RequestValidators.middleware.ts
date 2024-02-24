import { body, checkExact } from 'express-validator'
import Cities from '../../model/user-manegment/Cities.model'
import Countries from '../../model/user-manegment/Countries.model'
import PhoneNumberChecker from './PhoneNumberChecke.middleware'
import Groups from '../../model/user-manegment/Groups.model'
import Roles from '../../model/user-manegment/Roles.models'

const RequestValidators = {
  SIGNUP: [
    checkExact([
      body('group')
        .isString()
        .notEmpty()
        .custom((group) => {
          return group.toUpperCase() in Groups
        })
        .custom((group) => {
          const currGroup = Groups[group.toUpperCase()]
          return currGroup.includes(Roles.SIGNUP)
        }),
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
      body('group')
        .isString()
        .notEmpty()
        .custom((group) => {
          return group.toUpperCase() in Groups
        })
        .custom((group) => {
          const currGroup = Groups[group.toUpperCase()]
          return currGroup.includes(Roles.LOGIN)
        }),
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
