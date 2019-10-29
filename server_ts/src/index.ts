import * as socketio from 'socket.io'
import { io, emitter } from './shared/server'
import { logger } from './services/init'
import { SERVER_PASSWORD, ADMIN_PASSWORD } from './shared/config'
import { exceptionHandler } from './shared/exceptions'
import { ListPickerHandler } from './handlers/list'
import { MiscHandler } from './handlers/misc'
import { GameHandler } from './handlers/game'

let listPickerHandler = new ListPickerHandler()
let miscHandler = new MiscHandler()
let gameHandler = new GameHandler()

io.on('connection', (socket: socketio.Socket): void => {
  logger.writeLog('SERVER002', { id: socket.id })
  socket['admin'] = false
  socket['auth'] = false
  socket['timer'] = setTimeout((): void => {
    checkClientAuth(socket)
  }, 2000)

  socket.on('AUTHENTICATE', exceptionHandler(socket, (password: string, callback: any) => {
    checkPassword(socket, password)
    startListeners(socket, callback)
  }))

  socket.on('disconnect', exceptionHandler(socket, () => {
    logger.writeLog('SERVER003', { id: socket.id })
  }))
})

function checkClientAuth(socket: socketio.Socket): void {
  if (!socket['auth']) {
    logger.writeLog('AUTH002', { id: socket.id })
    socket.disconnect(true)
  }
}

function checkPassword(socket: socketio.Socket, password: string): void {
  if (password === SERVER_PASSWORD || password === ADMIN_PASSWORD) {
    socket['auth'] = true
  }
  if (password === ADMIN_PASSWORD) {
    socket['admin'] = true
  }
}

function startListeners(socket: socketio.Socket, callback: any): void {
  if (socket['auth']) {
    emitter.updateAdminStatus(socket['admin'], socket.id)
    listPickerHandler.start(socket)
    miscHandler.start(socket)
    gameHandler.start(socket)
  }
  callback(socket['auth'])
}