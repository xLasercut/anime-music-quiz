import { AMQLogger } from '../logging/logging'
import { AMQPlayers, PlayerGuess, PlayerReady, InputPlayerObj, PlayerData, PlayerObj } from '../../shared/interfaces'
import { BannerColor } from '../../shared/types'
import { PLAYER_USERNAME_FORMAT } from '../../shared/config'
import { AMQGameError } from '../../shared/exceptions'

class PlayerService {
  private _logger: AMQLogger
  private _data: AMQPlayers

  constructor(logger: AMQLogger) {
    this._logger = logger
    this._data = {}
  }

  newPlayer(sid: string, admin: boolean, inputInfo: InputPlayerObj): void {
    let host = false
    if (this.zeroPlayersRemain()) {
      host = true
    }
    let { username, avatar, score } = this._parseInputInfo(inputInfo)
    this._validateInputPlayerInfo(username, avatar, score)
    this._data[sid] = new Player()
    this._data[sid].admin = admin
    this._data[sid].host = host
    this._data[sid].username = username
    this._data[sid].score = score
    this._data[sid].avatar = avatar
    this._logger.writeLog('PLAYER001', { id: sid, username: username })
  }

  zeroPlayersRemain(): boolean {
    return (Object.keys(this._data).length === 0)
  }

  getPlayerData(): PlayerData {
    let playerData = {}
    for (let sid in this._data) {
      playerData[sid] = this._data[sid].serialize()
    }
    return playerData
  }

  _validateInputPlayerInfo(username: string, avatar: string, score: number): void {
    if (!username.match(PLAYER_USERNAME_FORMAT)) {
      throw new AMQGameError('Invalid username')
    }

    if (!avatar) {
      throw new AMQGameError('Invalid avatar')
    }

    if (!Number.isInteger(score) || score < 0 || score > 200) {
      throw new AMQGameError('Invalid score')
    }
  }

  _parseInputInfo(inputInfo: InputPlayerObj) {
    let username = inputInfo.username
    let avatar = inputInfo.avatar
    let score = inputInfo.score

    return { username, avatar, score }
  }
}

class Player {
  username = 'Placeholder'
  score = 0
  avatar = '0'
  color: BannerColor = 'error'
  host = false
  admin = false
  guess: PlayerGuess
  ready: PlayerReady

  reset(): void {
    this.guess = {
      anime: '',
      title: ''
    }

    this.ready = {
      load: false,
      guess: false,
      select: false
    }

    this.color = 'error'
  }

  serialize(): PlayerObj {
    return {
      username: this.username,
      score: this.score,
      avatar: this.avatar,
      color: this.color,
      host: this.host,
      admin: this.admin,
      guess: this.guess
    }
  }
}

export { PlayerService, Player }