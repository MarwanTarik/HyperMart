import stageConfig from '../../configs/main.config'
import ExternalAPIError from '../../error/externalApi.error'
import ErrorType from '../../error/error.type'
import HttpStatusCode from '../../error/error.status'
import APIError from '../../error/api.error'

class PhoneNumberChecker {
  private readonly phoneNumber: string
  private readonly countryCode: string

  constructor (phoneNumber: string, countryCode: string) {
    this.phoneNumber = phoneNumber
    this.countryCode = countryCode
  }

  async checkPhoneNumber (): Promise<boolean> {
    let valid = false
    const phone = this.phoneNumber
    const countryCode = this.countryCode
    const apiKey = stageConfig.PHONENUMBER_API_KEY

    if (apiKey === undefined) {
      throw new APIError(
        ErrorType.API_ERROR,
        HttpStatusCode.BAD_REQUEST,
        'api key for Phone Number API is undefined',
        true
      )
    }

    const phoneNumberAPI = `https://api-bdc.net/data/phone-number-validate?number=${phone}&countryCode=${countryCode}&localityLanguage=en&key=${apiKey}`
    const res = await fetch(phoneNumberAPI, { method: 'GET' })

    if (res === undefined) {
      throw new ExternalAPIError(
        ErrorType.API_ERROR,
        HttpStatusCode.BAD_REQUEST,
        'API response is undefined',
        false,
        'https://api-bdc.net/data/phone-number-validate'
      )
    }

    valid = (await res.json()).isValid
    return valid
  }
}

export default PhoneNumberChecker
