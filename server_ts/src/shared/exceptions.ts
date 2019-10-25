import socketio = require('socket.io')
import { logger, msgEmitter } from '../init'

class AMQDbError extends Error {
  constructor(message: string){
    super(message)
    this.name = 'AMQDbError'
  }
}

function exceptionHandler(socket: socketio.Socket, f) {
  return function() {
    try {
      return f.apply(this, arguments)
    }
    catch (e) {
      if (e.name === 'AMQDbError') {
        msgEmitter.notification('error', e.message, socket)
      }
      else {
        logger.writeLog('SERVER004', { stack: e.stack })
      }
    }
  }
}

export { exceptionHandler, AMQDbError }