path = require 'path'
winston = require 'winston'
require 'winston-daily-rotate-file'
{ combine, timestamp, printf } = winston.format

format = printf ({ level, message, timestamp }) =>
  return "[#{timestamp}] - [#{level}]: #{message}"

logBase = path.join(__dirname, '..', 'logs')

errorLog = new winston.transports.DailyRotateFile({
  frequency: '24h',
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: logBase,
  maxFiles: '5',
  level: 'error'
})

infoLog = new winston.transports.DailyRotateFile({
  frequency: '24h',
  filename: 'server-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: logBase,
  maxFiles: '5',
  level: 'info'
})

debugLog = new winston.transports.DailyRotateFile({
  frequency: '24h',
  filename: 'debug-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: logBase,
  maxFiles: '5',
  level: 'debug'
})

logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    format
  ),
  transports: [
    errorLog,
    infoLog,
    debugLog,
    new winston.transports.Console({ level: 'info' })
  ]
})

module.exports = logger