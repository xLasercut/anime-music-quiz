import { LOGBASE_PATH, LOG_DIR } from '../../shared/config'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import * as fs from 'fs'
import * as ini from 'ini'
import * as mustache from 'mustache'
import { LogConfig, LogBaseConfig } from '../../shared/interfaces'
let { combine, timestamp, printf } = winston.format

let logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level} | ${message}`
})

let amqLog = new DailyRotateFile({
  frequency: '24h',
  filename: 'amq-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: LOG_DIR,
  maxFiles: '5',
  level: 'debug'
})

let logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    amqLog,
    new winston.transports.Console({ level: 'debug' })
  ]
})

class AMQLogger {
  private _config: LogBaseConfig

  constructor() {
    this._config = ini.parse(fs.readFileSync(LOGBASE_PATH, { encoding: 'utf-8' }))
  }

  writeLog(logReference: string, variables: object={}): void {
    let logConfig: LogConfig = this._config[logReference]
    if (logConfig) {
      let level: string = logConfig.Level
      let template: string = logConfig.Text
      if (!template) {
        this.writeLog('LOG004', { logReference: logReference, text: template })
      }
      else {
        let msg: string = mustache.render(template, variables)
        let logMsg: string = `${logReference} | ${msg}`
        if (level === 'INFO') {
          logger.info(logMsg)
        }
        else if (level === 'WARN') {
          logger.warn(logMsg)
        }
        else if (level === 'ERROR') {
          logger.error(logMsg)
        }
        else if (level === 'DEBUG') {
          logger.debug(logMsg)
        }
        else {
          this.writeLog('LOG002', { logReference: logReference, level: level })
        }
      }
    }
    else {
      this.writeLog('LOG001', { logReference: logReference })
    }
  }
}

export { AMQLogger }