import stageConfig from '../../config/main'

class PhoneNumberChecker {
  private readonly phoneNumber: string
  private readonly countryCode: string

  constructor (phoneNumber: string, countryCode: string) {
    this.phoneNumber = phoneNumber
    this.countryCode = countryCode
  }

  async checkPhoneNumber (): Promise<boolean> {
    let valid = false
    try {
      const phoneNumberAPI = `https://api-bdc.net/data/phone-number-validate?number=${this.phoneNumber}&countryCode=${this.countryCode}&localityLanguage=en&key=${stageConfig.PHONENUMBER_API_KEY}`
      const res = await fetch(phoneNumberAPI, { method: 'GET' })
      valid = (await res.json()).isValid
    } catch (e) {
      console.error('Phone Number Validation API Error', e)
    }
    return valid
  }
}

export default PhoneNumberChecker
