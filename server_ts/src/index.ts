import * as socketio from 'socket.io'
import { SERVER_PASSWORD, ADMIN_PASSWORD } from './shared/config'
import { ListPickerHandler } from './list/handlers'

import { logger, db, io, msgEmitter } from './init'
import { EmojiHandler } from './misc/handlers'
import { GameHandler } from './game/handlers'

let listHandler = new ListPickerHandler(logger, db, msgEmitter)
let emojiHandler = new EmojiHandler(logger, db, msgEmitter)
let gameHandler = new GameHandler(logger, db, msgEmitter)

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
    msgEmitter.syncAdminStatus(socket['admin'], socket)
    listHandler.start(socket)
    emojiHandler.start(socket)
    gameHandler.start(socket)
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