import * as fs from 'fs'
import * as path from 'path'
import { UserLists } from '../../shared/interfaces'
import { AMQLogger } from '../logging/logging'
import { USER_DATA_DIR, JSON_FILE_FORMAT } from '../../shared/config'
import { AMQSongListError } from '../../shared/exceptions'
import { writeFile, readFile } from './init'

class UserService {
  private _userLists: UserLists
  private _users: Array<string>
  private _logger: AMQLogger

  constructor(logger: AMQLogger) {
    this._logger = logger
    this.loadDb()
  }

  loadDb(): void {
    this._generateUsers()
    this._generateUserLists()
  }

  getUserList(user: string): Array<string> {
    this._validateUser(user)
    return this._userLists[user].list
  }

  getUsers(): Array<string> {
    return this._users
  }

  addSong(user: string, songId: string): void {
    this._validateUser(user)
    this._userLists[user].addSongId(songId)
    this._logger.writeLog('DATA003', { songId: songId, user: user, changeType: 'add song' })
  }

  removeSong(user: string, songId: string): void {
    this._validateUser(user)
    this._userLists[user].removeSongId(songId)
    this._logger.writeLog('DATA003', { songId: songId, user: user, changeType: 'remove song' })
  }

  _generateUsers(): void {
    this._users = []
    for (let file of fs.readdirSync(USER_DATA_DIR)) {
      if (file.match(JSON_FILE_FORMAT)) {
        this._users.push(file.replace('.json', ''))
      }
    }
  }

  _generateUserLists(): void {
    this._userLists = {}
    for (let user of this._users) {
      let filepath = this._getUserFilePath(user)
      this._userLists[user] = new User(user, filepath, this._logger)
    }
  }

  _getUserFilePath(user: string): string {
    return path.join(USER_DATA_DIR, `${user}.json`)
  }

  _validateUser(user: string) {
    if (!this._users.includes(user)) {
      throw new AMQSongListError('Invalid user')
    }
  }
}

class User {
  private _data: Array<string>
  private _filepath: string
  private _logger: AMQLogger
  private _name: string

  constructor(name: string, filepath: string, logger: AMQLogger) {
    this._filepath = filepath
    this._logger = logger
    this._name = name
    this.loadDb()
  }

  get list(): Array<string> {
    return this._data
  }

  addSongId(songId: string) {
    this._validateAddSongId(songId)
    this._data.push(songId)
    writeFile(this._filepath, this._data)
  }

  removeSongId(songId: string) {
    this._validateRemoveSongId(songId)
    let i = this._data.indexOf(songId)
    this._data.splice(i, 1)
    writeFile(this._filepath, this._data)
  }

  loadDb(): void {
    this._data = readFile(this._filepath)
  }

  _validateAddSongId(songId: string): void {
    if (this._data.includes(songId)) {
      throw new AMQSongListError('Song already in user list')
    }
  }

  _validateRemoveSongId(songId: string): void {
    if (!this._data.includes(songId)) {
      throw new AMQSongListError('Song not in user list')
    }
  }
}

export { UserService, User }