import * as fs from 'fs'
import * as path from 'path'
import { USER_DATA_DIR, JSON_FILE_FORMAT } from '../shared/config'
import { SongData } from './anime'
import { UserData } from './user'
import { AMQLogger } from '../shared/logger'
import { Song, UserDatas, Emoji, Choices } from '../shared/interfaces'
import { EmojiData, ChatBotData } from './misc'

class AMQDatabase {
  _songData: SongData
  _logger: AMQLogger
  users: Array<string>
  _userDatas: UserDatas
  _emojiData: EmojiData
  _botData: ChatBotData

  constructor(logger: AMQLogger) {
    this._logger = logger
    this.loadDb()
  }

  loadDb(): void {
    this._songData = new SongData(this._logger)
    this._emojiData = new EmojiData(this._logger)
    this._botData = new ChatBotData(this._logger)
    this._generateUserDb()
  }

  addUserSong(user: string, songId: string): void {
    this._songData.validateSongId(user, songId)
    this._userDatas[user].validateAddSongId(songId)
    this._userDatas[user].addSong(songId)
    this._logger.writeLog('DATA003', { songId: songId, user: user, changeType: 'add song' })
  }

  removeUserSong(user: string, songId: string): void {
    this._userDatas[user].validateRemoveSongId(songId)
    this._userDatas[user].removeSong(songId)
    this._logger.writeLog('DATA003', { songId: songId, user: user, changeType: 'remove song' })
  }

  getUserList(user: string): Array<string> {
    return this._userDatas[user].db
  }

  addEmoji(emoji: Emoji): void {
    this._emojiData.addEmoji(emoji)
  }

  removeEmoji(emoji: Emoji): void {
    this._emojiData.removeEmoji(emoji)
  }

  getCombinedList(users: Array<string>): Array<Song> {
    let combinedSongIds = this._getCombinedSongIds(users)
    let combinedList = []
    for (let song of this.songList) {
      if (combinedSongIds.includes(song['songId'])) {
        combinedList.push(song)
      }
    }
    return combinedList.sort((_a, _b) => {
      return Math.random() - 0.5
    })
  }

  get songList(): Array<Song> {
    return this._songData.db
  }

  get emojiList(): Array<Emoji> {
    return this._emojiData.db
  }

  get choices(): Choices {
    return this._songData.choices
  }

  _getCombinedSongIds(users: Array<string>): Array<string> {
    let combinedSongIds = []
    for (let user of users) {
      for (let songId of this._userDatas[user].db) {
        if (!combinedSongIds.includes(songId)) {
          combinedSongIds.push(songId)
        }
      }
    }
    return combinedSongIds
  }

  _generateUserDb(): void {
    this.users = this._getUsers()
    this._userDatas = {}
    for (let user of this.users) {
      let userFilepath = this._getUserFilepath(user)
      this._userDatas[user] = new UserData(user, userFilepath, this._logger)
    }
  }

  _getUserFilepath(user: string): string {
    return path.join(USER_DATA_DIR, `${user}.json`)
  }

  _getUsers(): Array<string> {
    let users: Array<string> = []
    for (let file of fs.readdirSync(USER_DATA_DIR)) {
      if (file.match(JSON_FILE_FORMAT)) {
        users.push(file.replace('.json', ''))
      }
    }
    return users
  }
}


export { AMQDatabase }