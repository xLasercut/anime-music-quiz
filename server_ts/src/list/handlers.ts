import socketio = require('socket.io')
import { AMQLogger } from '../shared/logging/logger'
import { AMQDatabase } from '../database'
import { MessageEmitter } from '../shared/handlers'
import { exceptionHandler } from '../shared/exceptions'
import { Song } from '../shared/interfaces'

class ListPickerHandler {
  _logger: AMQLogger
  _db: AMQDatabase
  _emitter: MessageEmitter

  constructor(logger: AMQLogger, db: AMQDatabase, emitter: MessageEmitter) {
    this._logger = logger
    this._db = db
    this._emitter = emitter
  }

  start(socket: socketio.Socket): void {

    socket.on('LOGIN_LIST', exceptionHandler(socket, () => {
      this._emitter.syncUsers(socket)
    }))

    socket.on('SYNC_FULL_LIST', exceptionHandler(socket, () => {
      this._logger.writeLog('LIST002', { id: socket.id })
      this._emitter.syncSongList(socket)
    }))

    socket.on('ADD_SONG', exceptionHandler(socket, (song: Song, user: string) => {
      let { anime, title, songId } = this._parseSong(song)
      this._logger.writeLog('LIST004', { id: socket.id,
                                         anime: anime,
                                         title: title,
                                         songId: songId,
                                         user: user })
      this._db.addUserSong(user, songId)
      this._emitter.syncUserList(user)
      this._emitter.notification('success', `${anime}: ${title} added`, socket)
    }))

    socket.on('REMOVE_SONG', exceptionHandler(socket, (song: Song, user: string) => {
      let { anime, title, songId } = this._parseSong(song)
      this._logger.writeLog('LIST004', { id: socket.id,
                                         anime: anime,
                                         title: title,
                                         songId: songId,
                                         user: user })
      this._db.removeUserSong(user, songId)
      this._emitter.syncUserList(user)
      this._emitter.notification('success', `${anime}: ${title} removed`, socket)
    }))

  }

  _parseSong(song: Song) {
    let anime = song['anime'][0]
    let title = song['title']
    let songId = song['songId']

    return { anime, title, songId }
  }

}

export { ListPickerHandler }