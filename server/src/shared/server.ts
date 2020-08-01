import * as express from 'express'
import * as socketio from 'socket.io'

import { SERVER_PORT } from './config'

import { logger } from '../services/init'
import { MessageEmitter } from './emitter'

let app = express()
let server = app.listen(SERVER_PORT, () => {
  logger.writeLog('SERVER001', { port: SERVER_PORT })
})

let io = socketio(server)
let emitter = new MessageEmitter(io)
io.origins('*:*')

export { io, emitter }