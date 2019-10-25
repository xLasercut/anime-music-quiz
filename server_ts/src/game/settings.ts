import { AbstractGameData } from '../shared/abstracts'
import { AMQLogger } from '../shared/logger'
import { SettingObj } from '../shared/interfaces'
import { GameMode } from '../shared/types'

class GameSettings extends AbstractGameData {
  songCount = 20
  guessTime = 30
  gameMode: GameMode
  duplicate = false
  selectTime = 20
  users: Array<string>

  constructor(logger: AMQLogger) {
    super(logger)
    this.users = []
  }

  update(settings: SettingObj): void {
    let songCount = settings['songCount']
    let guessTime = settings['guessTime']
    let users = settings['users']
    let gameMode = settings['gameMode']
    let duplicate = settings['duplicate']
    let selectTime = settings['selectTime']

    this.songCount = songCount
    this.guessTime = guessTime
    this.users = users
    this.gameMode = gameMode
    this.duplicate = duplicate
    this.selectTime = selectTime

    this._logger.writeLog('SETTING002', { songCount: songCount,
                                          guessTime: guessTime,
                                          gameMode: gameMode,
                                          duplicate: duplicate,
                                          users: users.join('|'),
                                          selectTime: selectTime })
  }

  serialize(): SettingObj {
    return {
      songCount: this.songCount,
      guessTime: this.guessTime,
      gameMode: this.gameMode,
      duplicate: this.duplicate,
      selectTime: this.selectTime,
      users: this.users
    }
  }
}

export { GameSettings }