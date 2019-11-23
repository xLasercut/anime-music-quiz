import * as socketio from 'socket.io'
import { emitter } from './server'
import { logger } from '../services/init'

class AMQSongListError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AMQSongListError'
  }
}

class AMQEmojiListError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AMQEmojiListError'
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
      if (e.name === 'AMQSongListError') {
        logger.writeLog('DATA001', { reason: e.message })
        emitter.notification('error', e.message, socket.id)
      }
      else if (e.name === 'AMQEmojiListError') {
        logger.writeLog('DATA002', { reason: e.message })
        emitter.notification('error', e.message, socket.id)
      }
      else if (e.name === 'AMQGameError') {
        logger.writeLog('GAME009', { reason: e.message })
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

export { exceptionHandler, AMQAdminError, AMQGameError, AMQSongListError, AMQEmojiListError }