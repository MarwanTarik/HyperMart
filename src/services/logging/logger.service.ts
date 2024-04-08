import winston, { type Logger } from 'winston'
import config from '../../configs/main.config'

class LoggerService {
  logger: Logger
  route: string

  constructor (route: string) {
    this.route = route

    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => {
          const formattedMessage = `${timestamp} | ${level.toUpperCase()} | ${message} |`
          return formattedMessage
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${config.LOGS_FILE_PATH}/${route}.log`
        })
      ]
    })

    this.logger = logger
  }
}

export default LoggerService
