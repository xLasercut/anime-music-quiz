import { AMQLogger } from '../logging/logging'
import { AMQPlayers, PlayerGuess, PlayerReady, InputPlayerObj, PlayerData, PlayerObj, SongObj } from '../../shared/interfaces'
import { BannerColor, ReadyType } from '../../shared/types'
import { PLAYER_USERNAME_FORMAT } from '../../shared/config'
import { AMQGameError } from '../../shared/exceptions'
import { ScoreCalculator } from './score-calc'

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

  removePlayer(sid: string): void {
    this._validateSid(sid)
    let username = this._data[sid].username
    let host = this._data[sid].host
    this._logger.writeLog('PLAYER002', { id: sid, username: username })
    delete this._data[sid]
    this._moveHost(host)
  }

  setReady(sid: string, state: boolean, type: ReadyType): void {
    this._validateSid(sid)
    this._data[sid].ready[type] = state
  }

  setGuess(sid: string, guess: PlayerGuess): void {
    this._validateSid(sid)
    this._data[sid].guess = guess
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

  getPlayerObj(sid: string): PlayerObj {
    this._validateSid(sid)
    return this._data[sid].serialize()
  }

  resetScore(): void {
    for (let sid in this._data) {
      this._data[sid].score = 0
    }
  }

  newRound(): void {
    for (let sid in this._data) {
      this._data[sid].reset()
    }
  }

  roundOver(currentSong: SongObj): void {
    this._logger.writeLog('GAME006')
    let scoreCalc = new ScoreCalculator(currentSong)
    for (let sid in this._data) {
      let { point, color } = scoreCalc.getScore(this._data[sid].guess)
      this._data[sid].score += point
      this._data[sid].color = color
    }
  }

  allPlayerReady(type: ReadyType): boolean {
    for (let sid in this._data) {
      if (!this._data[sid].ready[type]) {
        return false
      }
    }
    return true
  }

  singlePlayerReady(sid: string, type: ReadyType): boolean {
    this._validateSid(sid)
    return this._data[sid].ready[type]
  }

  generateSelector(): string {
    let sids = Object.keys(this._data)
    let sid = sids[Math.floor(Math.random() * sids.length)]
    this._data[sid].selector = true
    return sid
  }

  isSelector(sid: string): boolean {
    this._validateSid(sid)
    return this._data[sid].selector
  }

  _moveHost(host: boolean): void {
    if (!this.zeroPlayersRemain() && host) {
      let sid = Object.keys(this._data)[0]
      this._data[sid].host = true
    }
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

  _validateSid(sid: string): void {
    if (!(sid in this._data)) {
      throw new AMQGameError('Invalid player id')
    }
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
  selector = false

  constructor() {
    this.reset()
  }

  reset(): void {
    this.guess = {
      anime: '',
      title: ''
    }

    this.clearReady()

    this.color = 'error'

    this.selector = false
  }

  clearReady(): void {
    this.ready = {
      load: false,
      guess: false,
      select: false
    }
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