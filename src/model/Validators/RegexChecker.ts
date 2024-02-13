import Checker from './Checker'

class RegexChecker extends Checker {
  regex: RegExp
  field: string

  constructor (regex: RegExp, field: string) {
    super()
    this.regex = regex
    this.field = field
  }

  async check (): Promise<boolean> {
    const valid = await this.checkRegex()
    if (!valid) {
      return false
    }
    return await super.callNext()
  }

  async checkRegex (): Promise<boolean> {
    return this.regex.test(this.field)
  }
}

export default RegexChecker
