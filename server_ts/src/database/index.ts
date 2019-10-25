import fs = require('fs')
import { USER_DATA_DIR, JSON_FILE_FORMAT } from '../shared/config'
import { SongData } from './anime'
import { UserData } from './user'
import { AMQLogger } from '../shared/logging/logger'

class AMQDatabase {
  _songData: SongData
  _logger: AMQLogger
  users: Array<string>
  _userDatas: object

  constructor(logger: AMQLogger) {
    this._logger = logger
    this.loadDb()
  }

  loadDb(): void {
    this._songData = new SongData(this._logger)
    this._generateUserDb()
  }

  _generateUserDb(): void {
    this.users = this._getUsers()
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