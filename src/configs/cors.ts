import { type CorsOptions, type CorsOptionsDelegate, type CorsRequest } from 'cors'

const WHITE_LIST = [
  'https://api-bdc.net/data/phone-number-validate'
]

const corsOptionsDelegate: CorsOptionsDelegate<CorsRequest> = function (req: CorsRequest, callback) {
  let corsOptions: CorsOptions
  const origin = req.headers?.origin

  if (origin === undefined) {
    corsOptions = { origin: false }
  } else if (WHITE_LIST.includes(origin)) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }

  callback(null, corsOptions)
}

export default corsOptionsDelegate
