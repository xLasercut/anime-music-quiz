import { AMQLogger } from '../logging/logging'
import { GameMode } from '@shared/types'
import { SettingsObj } from '@shared/interfaces'

class GameSettingService {
  private _logger: AMQLogger
  songCount = 20
  guessTime = 30
  gameMode: GameMode = 'normal'
  duplicate = false
  selectTime = 20
  users: Array<string> = []

  constructor(logger: AMQLogger) {
    this._logger = logger
  }

  updateSettings(settings: SettingsObj): void {
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

    this._logger.writeLog('SETTING002', {
      songCount: songCount,
      guessTime: guessTime,
      gameMode: gameMode,
      duplicate: duplicate,
      users: users.join('|'),
      selectTime: selectTime
    })
  }

  getSettings(): SettingsObj {
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

export { GameSettingService }