import type RequestBody from '../../types/RequestBody'
import CheckerChainBuilder from './CheckerChainBuilder'
import RegexChecker from './RegexChecker'

interface Validators {
  SIGNUP: CheckerChainBuilder
  LOGIN: CheckerChainBuilder
}

class Validator {
  private readonly validators: Validators
  private readonly passwordRegex: RegExp = /^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  private readonly emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  constructor (request: { body: RequestBody }) {
    this.validators.SIGNUP = new CheckerChainBuilder()
      .addChecker(new RegexChecker(this.passwordRegex, request.body.password))
      .addChecker(new RegexChecker(this.emailRegex, request.body.email))

    this.validators.LOGIN = new CheckerChainBuilder()
      .addChecker(new RegexChecker(this.passwordRegex, request.body.password))
      .addChecker(new RegexChecker(this.emailRegex, request.body.email))
  }

  validate (validator: string): boolean {
    return this.validators[validator].getHead().check()
  }
}

export default Validator
