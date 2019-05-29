const path = require('path')
const winston = require('winston')
const { combine, timestamp, printf } = winston.format

const format = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] - [${level}]: ${message}`;
})

const logBase = path.join(__dirname, '..', 'logs')

const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    format
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logBase, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logBase, 'server.log'), level: 'info' }),
    new winston.transports.File({ filename: path.join(logBase, 'debug.log'), level: 'debug' }),
    new winston.transports.Console({ level: 'info' })
  ]
})

module.exports = logger