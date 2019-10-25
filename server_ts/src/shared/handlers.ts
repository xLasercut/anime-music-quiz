import * as socketio from 'socket.io'
import { AMQDatabase } from '../database/index'
import { db } from '../init'
import { PlayerDataSerialized, SettingObj, SongCount, Song } from './interfaces'

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

  syncEmojiData(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_EMOJI_DATA', this._db.emojiList)
  }

  syncAdminStatus(admin: boolean, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_ADMIN', admin)
  }

  syncGameStatePlaying(playing: boolean, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_PLAYING', playing)
  }

  syncPlayerData(data: PlayerDataSerialized, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_PLAYERS', data)
  }

  syncGameChoices(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_CHOICES', this._db.choices)
  }

  syncGameSetting(settings: SettingObj, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_SETTINGS', settings)
  }

  syncSongCount(counts: SongCount, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_SONG_COUNT', counts)
  }

  gameNewSong(currentSong: Song, startPosition: number, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('NEW_SONG', currentSong, startPosition)
  }

  gameStartCountdown(guessTime: number, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('START_COUNTDOWN', guessTime)
  }

  gameTimeUp(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('TIME_UP')
  }

  gameShowGuess(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SHOW_GUESS')
  }

  gameReset(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('RESET')
  }

  resetSelector(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('RESET_SELECTOR')
  }

  gameSelectSong(sid: string, selectTime: number): void {
    let client = this._getClient(sid)
    if (client) {
      client.emit('SELECT_SONG', selectTime)
    }
  }

  gameSelectSongOver(sid: string): void {
    let client = this._getClient(sid)
    if (client) {
      client.emit('SELECT_SONG_OVER')
    }
  }

  _getClient(sid: string): socketio.Socket {
    return this._io.nsps['/'].connected[sid]
  }

  _emitter(socket: socketio.Socket=null): socketio.Socket | socketio.Server {
    if (socket) {
      return socket
    }
    return this._io
  }
}

export { MessageEmitter }