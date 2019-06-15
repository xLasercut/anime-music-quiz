path = require 'path'
winston = require 'winston'
require 'winston-daily-rotate-file'
fs = require 'fs'
ini = require 'ini'
mustache = require 'mustache'
{ combine, timestamp, printf } = winston.format

format = printf ({ level, message, timestamp }) =>
  return "[#{timestamp}] - [#{level}] - #{message}"

logBase = path.join(__dirname, '..', '..', 'logs')
configPath = path.join(__dirname, 'logbase.cfg')

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
    new winston.transports.Console({ level: 'debug' })
  ]
})


class LogObject
  constructor: () ->
    @config = ini.parse(fs.readFileSync(configPath, { encoding: 'utf-8' }))

  writeLog: (logReference, variables={}) ->
    config = @config[logReference]
    if config
      level = config['Level']
      template = config['Text']
      if !template
        @writeLog('LOG003', { logReference: logReference, text: template })
      else
        msg = mustache.render(template, variables)
        logMsg = "[#{logReference}]: #{msg}"
        if level == 'INFO'
          logger.info(logMsg)
        else if level == 'WARN'
          logger.warn(logMsg)
        else if level == 'ERROR'
          logger.error(logMsg)
        else if level == 'DEBUG'
          logger.debug(logMsg)
        else
          @writeLog('LOG002', { logReference: logReference, level: level })
    else
      @writeLog('LOG001', { logReference: logReference })

module.exports = LogObject