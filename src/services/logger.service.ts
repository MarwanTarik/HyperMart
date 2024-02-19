import winston, { type Logger } from 'winston'
import stageConfig from '../configs/main.config'

class LoggerService {
  logger: Logger
  route: string

  constructor (route: string) {
    this.route = route

    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.printf(({ level, message, timestamp }) => {
        const formatedMessage = `
        ${timestamp({ format: 'YYYY/MM/DD HH:mm:ss' })} | 
        ${level.toUpperCase()} | 
        ${message} |`
        return formatedMessage
      }),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${stageConfig.LOGS_FILE_PATH}/${route}.log`
        })
      ]
    })

    this.logger = logger
  }
}

export default LoggerService
