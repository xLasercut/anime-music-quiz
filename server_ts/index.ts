import socketio = require('socket.io')
import { SERVER_PASSWORD, ADMIN_PASSWORD } from './src/shared/config'
import { ListPickerHandler } from './src/list/handlers'

import { logger, db, io, msgEmitter } from './src/init'

let listHandler = new ListPickerHandler(logger, db, msgEmitter)

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
    listHandler.start(socket)
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