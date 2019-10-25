import { PlayerGuess, PlayerReady, PlayerObj, PlayerDatas, PlayerInputObj, PlayerDataSerialized, Song } from '../shared/interfaces'
import { AMQLogger } from '../shared/logger'
import { ReadyType, BannerColor } from '../shared/types'
import { ScoreCalculator } from './helper'

class PlayerManager {
  _logger: AMQLogger
  _players: PlayerDatas

  constructor(logger: AMQLogger) {
    this._logger = logger
    this._players = {}
  }

  newPlayer(sid: string, admin: boolean, player: PlayerInputObj): void {
    let host = false
    if (Object.keys(this._players).length === 0) {
      host = true
    }

    this._players[sid] = new Player()
    this._players[sid].username = player['username']
    this._players[sid].score = player['score']
    this._players[sid].avatar = player['avatar']
    this._players[sid].host = host
    this._players[sid].admin = admin
    this._logger.writeLog('PLAYER001', { id: sid, username: player['username'] })
  }

  removePlayer(sid: string): void {
    let username = this._players[sid].username
    let host = this._players[sid].host
    this._logger.writeLog('PLAYER001', { id: sid, username: username })
    delete this._players[sid]
    this._moveHost(host)
  }

  serialize(): PlayerDataSerialized {
    let players = {}
    for (let sid in this._players) {
      players[sid] = this._players[sid].info
    }
    return players
  }

  resetScore(): void {
    for (let sid in this._players) {
      this._players[sid].score = 0
    }
  }

  newRound(): void {
    for (let sid in this._players) {
      this._players[sid].reset()
    }
  }

  setReady(sid: string, ready: boolean, type: ReadyType): void {
    this._players[sid].ready[type] = ready
  }

  setGuess(sid: string, guess: PlayerGuess): void {
    this._players[sid].guess = guess
  }

  allPlayerReady(type: ReadyType): boolean {
    for (let sid in this._players) {
      if (!this._players[sid].ready[type]) {
        return false
      }
    }
    this.readyClear()
    return true
  }

  singlePlayerReady(sid: string, type: ReadyType): boolean {
    if (this._players[sid] && this._players[sid].ready[type]) {
      this.readyClear()
      return true
    }
    return false
  }

  songOver(song: Song): void {
    this._logger.writeLog('GAME006')
    let scoreCalc = new ScoreCalculator(song)
    for (let sid in this._players) {
      let { point, color } = scoreCalc.getScore(this._players[sid].guess)
      this._players[sid].score += point
      this._players[sid].color = color
    }
  }

  readyClear(): void {
    for (let sid in this._players) {
      this.setReady(sid, false, 'song')
      this.setReady(sid, false, 'select')
      this.setReady(sid, false, 'guess')
    }
  }

  randomId(): string {
    let sids = Object.keys(this._players)
    return sids[Math.floor(Math.random() * sids.length)]
  }

  _moveHost(host: boolean): void {
    if (!this.isZeroPlayers() && host) {
      let sid = Object.keys(this._players)[0]
      this._players[sid].host = true
    }
  }

  isZeroPlayers(): boolean {
    return (Object.keys(this._players).length === 0)
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

  constructor() {
    this.reset()
  }

  get info(): PlayerObj {
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

  reset(): void {
    this.guess = {
      song: '',
      anime: ''
    }

    this.ready = {
      song: false,
      guess: false,
      select: false
    }

    this.color = 'error'
  }
}

export { Player, PlayerManager }