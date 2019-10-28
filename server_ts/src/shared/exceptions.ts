import * as socketio from 'socket.io'
import { emitter } from './server'
import { logger } from '../services/init'

class AMQDbError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AMQDbError'
  }
}

class AMQAdminError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AMQAdminError'
  }
}

class AMQGameError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AMQGameError'
  }
}

function exceptionHandler(socket: socketio.Socket, f: any) {
  return function() {
    try {
      return f.apply(this, arguments)
    }
    catch (e) {
      if (e.name === 'AMQDbError' || e.name === 'AMQGameError') {
        emitter.notification('error', e.message, socket.id)
      }
      else if (e.name === 'AMQAdminError') {
        emitter.notification('error', e.message, socket.id)
        socket.disconnect()
      }
      else {
        logger.writeLog('SERVER004', { stack: e.stack })
      }
    }
  }
}

export { exceptionHandler, AMQDbError, AMQAdminError, AMQGameError }