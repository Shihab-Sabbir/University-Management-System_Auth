/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'
//import { NODE_ENV } from '../config'

const { combine, label, prettyPrint, printf } = format

//custom log format
const myFormat = printf(({ level, message, label }) => {
  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'University Management System' }),
    prettyPrint(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        '%DATE%.log'
      ),
      // this will create a folder name logs then inside that there will be a folder name winstone then inside that there will be folder called success and inside that new files will be automatically created in every 1 hour. and after 14 days old files will be removed
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    // new transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
    //   level: 'info',
    // }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'University Management System' }),
    prettyPrint(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        '%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '30m',
      maxFiles: '1d',
    }),
  ],
})

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

// if (NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   )
// }

export { logger, errorLogger }
