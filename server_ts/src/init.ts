import express = require('express')
import socketio = require('socket.io')

import { AMQLogger } from "./shared/logging/logger"
import { AMQDatabase } from "./database"
import { SERVER_PORT } from './shared/config'
import { MessageEmitter } from './shared/handlers'

let logger = new AMQLogger()
let db = new AMQDatabase(logger)

let app = express()
let server = app.listen(SERVER_PORT, () => {
  logger.writeLog('SERVER001', { port: SERVER_PORT })
})

let io = socketio(server)
let msgEmitter = new MessageEmitter(io, db)

export { logger, db, io, msgEmitter }