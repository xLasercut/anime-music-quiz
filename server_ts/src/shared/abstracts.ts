import * as fs from 'fs'
import { AMQLogger } from './logger'
import { AMQDatabase } from '../database/index'
import { MessageEmitter } from './handlers'

class AbstractDataObject {
  _filepath: string
  _logger: AMQLogger
  db: Array<any>

  constructor(filepath: string, logger: AMQLogger) {
    this._filepath = filepath
    this._logger = logger
    this._initDb()
  }

  _initDb(): void {
    this.db = this._readFile()
  }

  _readFile(): Array<any> {
    return JSON.parse(fs.readFileSync(this._filepath, { encoding: 'utf-8' }))
  }

  _writeFile(): void {
    fs.writeFileSync(this._filepath, JSON.stringify(this.db, null, 2))
  }
}

class AbstractRequestHandler {
  _logger: AMQLogger
  _db: AMQDatabase
  _emitter: MessageEmitter

  constructor(logger: AMQLogger, db: AMQDatabase, emitter: MessageEmitter) {
    this._logger = logger
    this._db = db
    this._emitter = emitter
  }
}

class AbstractGameData {
  _logger: AMQLogger

  constructor(logger: AMQLogger) {
    this._logger = logger
  }
}

export { AbstractDataObject, AbstractRequestHandler, AbstractGameData }