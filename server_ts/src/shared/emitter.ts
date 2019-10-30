import * as socketio from 'socket.io'
import { BannerColor } from './types'
import { SongObj, EmojiObj, ChatObj, SettingsObj } from './interfaces/database'
import { PlayerData, GameChoices } from './interfaces/game'

class MessageEmitter {
  private _io: socketio.Server

  constructor(io: socketio.Server) {
    this._io = io
  }

  _client(sid: string=null): socketio.Namespace | socketio.Server {
    if (sid) {
      return this._io.to(sid)
    }
    return this._io
  }

  chat(msgData: ChatObj, sid: string=null): void {
    this._client(sid).emit('UPDATE_CHAT_MESSAGE', msgData)
  }

  updateAdminStatus(admin: boolean, sid: string=null): void {
    this._client(sid).emit('UPDATE_ADMIN_STATUS', admin)
  }

  notification(msgType: BannerColor, msg: string, sid: string=null): void {
    this._client(sid).emit('SYSTEM_NOTIFICATION', msgType, msg)
  }

  updateUsers(users: Array<string>, sid: string=null): void {
    this._client(sid).emit('UPDATE_USERS', users)
  }

  updateSongList(songList: Array<SongObj>, sid: string=null): void {
    this._client(sid).emit('UPDATE_SONG_LIST', songList)
  }

  updateUserList(user: string, userList: Array<string>, sid: string=null): void {
    let data = {
      userList: userList,
      user: user
    }
    this._client(sid).emit('UPDATE_USER_LIST', data)
  }

  updateEmojiData(emojiData: Array<EmojiObj>, sid: string=null): void {
    this._client(sid).emit('UPDATE_EMOJI_DATA', emojiData)
  }

  updatePlayerData(playerData: PlayerData, sid: string=null): void {
    this._client(sid).emit('UPDATE_PLAYER_DATA', playerData)
  }

  updateGameChoices(choices: GameChoices, sid: string=null): void {
    this._client(sid).emit('UPDATE_GAME_CHOICES', choices)
  }

  updateGameSettings(settings: SettingsObj, sid: string=null): void {
    this._client(sid).emit('UPDATE_GAME_SETTINGS', settings)
  }

  gameNewSong(currentSong: SongObj, startPosition: number, sid: string=null): void {
    this._client(sid).emit('UPDATE_CURRENT_SONG', currentSong)
    this._client(sid).emit('UPDATE_START_POSITION', startPosition)
    this._client(sid).emit('NEW_SONG')
  }
/*






  syncGameStatePlaying(playing: boolean, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_PLAYING', playing)
  }






  syncSongCount(counts: SongCount, socket: socketio.Socket=null): void {
    this._emitter(socket).emit('SYNC_SONG_COUNT', counts)
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

  kickPlayer(sid: string): void {
    let client = this._getClient(sid)
    if (client) {
      this.notification('error', 'You have been kicked', client)
      client.disconnect()
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
  */
}

export { MessageEmitter }
