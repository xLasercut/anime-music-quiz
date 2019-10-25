import express = require('express')
import socketio = require('socket.io')
import { SERVER_PORT, SERVER_PASSWORD, ADMIN_PASSWORD } from './src/shared/config'
import { AMQLogger } from './src/shared/logging/logger'
import { AMQDatabase } from './src/database/index'

let logger = new AMQLogger()
let db = new AMQDatabase(logger)

let app = express()
let server = app.listen(SERVER_PORT, () => {
  logger.writeLog('SERVER001', { port: SERVER_PORT })
})

let io = socketio(server)

function checkPassword(socket: socketio.Socket, password: string): void {
  if (password === SERVER_PASSWORD || password === ADMIN_PASSWORD) {
    socket['auth'] = true
  }

  if (password === ADMIN_PASSWORD) {
    socket['admin'] = true
  }
}

function startListeners(socket: socketio.Socket, callback) {
  if (socket['auth']) {
    console.log('test')
  }
  callback(socket['auth'])
}

io.on('connection', (socket) => {
  logger.writeLog('SERVER002', { id: socket.id })
  socket['admin'] = false
  socket['auth'] = false

  setTimeout(() => {
    if (!socket['auth']) {
      logger.writeLog('AUTH002', { id: socket.id })
      socket.disconnect(true)
    }
  }, 2000)

  socket.on('AUTHENTICATE', (password, callback) => {
    checkPassword(socket, password)
    startListeners(socket, callback)
  })
})