import socketio = require('socket.io')
import { AMQDatabase } from '../database/index'
import { db } from '../init'

class MessageEmitter {
  _io: socketio.Server
  _db: AMQDatabase

  constructor(io: socketio.Server, db: AMQDatabase) {
    this._io = io
    this._db = db
  }

  notification(msgType: string, msg: string, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYSTEM_NOTIFICATION', msgType, msg)
  }

  syncSongList(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_FULL_LIST', this._db.songList)
  }

  syncUsers(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_USER_LIST_FILES', this._db.users)
  }

  syncUserList(user: string, socket: socketio.Socket=null): void {
    let data = {
      list: db.getUserList(user),
      file: user
    }
    this._emitter(socket).emit('SYNC_USER_LIST', data)
  }

  _emitter(socket: socketio.Socket=null): socketio.Socket | socketio.Server {
    if (socket) {
      return socket
    }
    return this._io
  }
}

export { MessageEmitter }