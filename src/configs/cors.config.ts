import { type CorsOptions, type CorsOptionsDelegate, type CorsRequest } from 'cors'
import stageConfig from './main.config'

const WHITE_LIST = [
  stageConfig.PHONE_NUMBER_VLALIDATORE_API
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
