import * as socketio from 'socket.io'
import { BannerColor } from '../shared/types'
import { SongObj, EmojiObj, ChatObj, SettingsObj, GameStateObj, PlayersObj, GameChoices } from '../shared/interfaces'

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

  updateUserList(user: string, userList: Set<string>, sid: string=null): void {
    let data = {
      userList: Array.from(userList),
      user: user
    }
    this._client(sid).emit('UPDATE_USER_LIST', data)
  }

  updateEmojiData(emojiData: Array<EmojiObj>, sid: string=null): void {
    this._client(sid).emit('UPDATE_EMOJI_DATA', emojiData)
  }

  updatePlayerData(playerData: PlayersObj, sid: string=null): void {
    this._client(sid).emit('UPDATE_PLAYER_DATA', playerData)
  }

  updateGameChoices(choices: GameChoices, sid: string=null): void {
    this._client(sid).emit('UPDATE_GAME_CHOICES', choices)
  }

  updateGameSettings(settings: SettingsObj, sid: string=null): void {
    this._client(sid).emit('UPDATE_GAME_SETTINGS', settings)
  }

  updateGameState(gameState: GameStateObj, sid: string=null): void {
    this._client(sid).emit('UPDATE_GAME_STATE', gameState)
  }

  gameNewSong(sid: string=null): void {
    this._client(sid).emit('NEW_SONG')
  }

  gameStartCountdown(sid: string=null): void {
    this._client(sid).emit('START_COUNTDOWN')
  }

  gameTimeUp(sid: string=null): void {
    this._client(sid).emit('TIME_UP')
  }

  gameShowGuess(sid: string=null): void {
    this._client(sid).emit('SHOW_GUESS')
  }

  gameReset(sid: string=null): void {
    this._client(sid).emit('RESET')
  }

  gameSelectSong(sid: string=null): void {
    this._client(sid).emit('SELECT_SONG')
  }

  gameSelectSongOver(sid: string=null): void {
    this._client(sid).emit('SELECT_SONG_OVER')
  }

  kickPlayer(sid: string): void {
    let client = this._io.nsps['/'].connected[sid]
    if (client) {
      this.notification('error', 'You have been kicked', sid)
      client.disconnect()
    }
  }
/*






















  resetSelector(socket: socketio.Socket=null): void {
    this._emitter(socket).emit('RESET_SELECTOR')
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
