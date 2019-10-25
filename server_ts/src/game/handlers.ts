import * as socketio from 'socket.io'
import { AbstractRequestHandler } from '../shared/abstracts'
import { AMQLogger } from '../shared/logger'
import { AMQDatabase } from '../database/index'
import { MessageEmitter } from '../shared/handlers'
import { exceptionHandler } from '../shared/exceptions'
import { PlayerInputObj, SettingObj, PlayerGuess, Song } from '../shared/interfaces'
import { PlayerManager } from './player'
import { GameState } from './state'
import { GameSettings } from './settings'
import { AMQTimer } from './timer'

class GameHandler extends AbstractRequestHandler {
  _settingsHandler: SettingsHandler
  _playerHandler: PlayerHandler
  _stateHandler: GameStateHandler
  _playerManager: PlayerManager
  _gameState: GameState
  _settings: GameSettings
  _timer: AMQTimer

  constructor(logger: AMQLogger, db: AMQDatabase, emitter: MessageEmitter) {
    super(logger, db, emitter)
    this._playerManager = new PlayerManager(logger)
    this._gameState = new GameState(logger)
    this._settings = new GameSettings(logger)

    this._settingsHandler = new SettingsHandler(logger, db, emitter, this._settings)
    this._playerHandler = new PlayerHandler(logger, db, emitter, this._playerManager)
    this._stateHandler = new GameStateHandler(logger, db, emitter, this._gameState)

    this._timer = new AMQTimer()
  }

  start(socket: socketio.Socket): void {
    this._settingsHandler.start(socket)
    this._playerHandler.start(socket)
    this._stateHandler.start(socket)

    socket.on('disconnect', exceptionHandler(socket, () => {
      this._playerManager.removePlayer(socket.id)
      this._emitter.syncPlayerData(this._playerManager.serialize())
    }))

    socket.on('LOGIN_GAME', exceptionHandler(socket, (player: PlayerInputObj) => {
      this._playerManager.newPlayer(socket.id, socket['admin'], player)
      this._emitter.syncGameStatePlaying(this._gameState.playing, socket)
      this._emitter.syncPlayerData(this._playerManager.serialize())
      this._emitter.syncSongList(socket)
      this._emitter.syncUsers(socket)
      this._emitter.syncGameChoices(socket)
    }))

    socket.on('START_GAME', exceptionHandler(socket, () => {
      this._playerManager.resetScore()
      this._emitter.syncPlayerData(this._playerManager.serialize())
      this._gameState.generateGameList(this._db.getCombinedList(this._settings.users), this._settings.songCount, this._settings.duplicate)
      if (this._gameState.gameList.length > 0) {
        this._gameState.startGame(this._settings.gameMode)
        this._emitter.syncGameStatePlaying(this._gameState.playing)
        this._newRound()
      }
      else {

      }
    }))

    socket.on('STOP_GAME', exceptionHandler(socket, () => {
      this._resetGame()
    }))
  }

  _resetGame():void {
    this._timer.resetCountdown()
    this._timer.resetTimeout()
    this._gameState.reset()
    this._emitter.syncGameStatePlaying(this._gameState.playing)
    this._emitter.gameReset()
  }

  _newRound(): void {
    this._playerManager.newRound()
    this._emitter.syncPlayerData(this._playerManager.serialize())
    this._emitter.resetSelector()
    if (this._settings.gameMode === 'selector') {
      this._gameFlowSelector()
    }
    else {
      this._gameFlowMain()
    }
  }

  _gameFlowMain(): void {
    this._gameState.newSong()
    this._emitter.syncSongCount(this._gameState.counts)
    this._emitter.gameNewSong(this._gameState.currentSong, this._gameState.startPosition)
    this._timer.startCountdown(5000, this._playerManager, 'song')
    .then(() => {
      this._emitter.gameStartCountdown(this._settings.guessTime)
      return this._timer.startCountdown(this._settings.guessTime * 1000, this._playerManager, 'guess')
    })
    .then(() => {
      this._emitter.gameTimeUp()
      return this._timer.startCountdown(5000, this._playerManager, 'guess')
    })
    .then(() => {
      this._playerManager.songOver(this._gameState.currentSong)
      this._emitter.syncPlayerData(this._playerManager.serialize())
      this._emitter.gameShowGuess()
      if (this._gameState.gameEnd) {
        this._logger.writeLog('GAME003')
        this._resetGame()
        return this._timer.newRound(false)
      }
      return this._timer.newRound(true)
    })
    .then((newRound: boolean) => {
      if (newRound) {
        this._newRound()
      }
    })
    .catch((e) => {
      this._logger.writeLog('SERVER004', { stack: e })
    })
  }

  _gameFlowSelector(): void {
    let sid = this._playerManager.randomId()
    this._emitter.gameSelectSong(sid, this._settings.selectTime)
    this._timer.startCountdownSingle(this._settings.selectTime * 1000, sid, this._playerManager, 'select')
    .then(() => {
      this._emitter.gameSelectSongOver(sid)
      return this._gameFlowMain()
    })
    .catch((e) => {
      this._logger.writeLog('SERVER004', { stack: e })
    })
  }
}

class PlayerHandler extends AbstractRequestHandler {
  _playerManager: PlayerManager

  constructor(logger: AMQLogger, db: AMQDatabase, emitter: MessageEmitter, playerManager: PlayerManager) {
    super(logger, db, emitter)
    this._playerManager = playerManager
  }

  start(socket: socketio.Socket): void {
    socket.on('SONG_LOADED', exceptionHandler(socket, () => {
      this._playerManager.setReady(socket.id, true, 'song')
    }))

    socket.on('GUESS', exceptionHandler(socket, (guess: PlayerGuess) => {
      this._playerManager.setGuess(socket.id, guess)
      this._playerManager.setReady(socket.id, true, 'guess')
    }))

    socket.on('SONG_OVERRIDE', exceptionHandler(socket, (_song: Song) => {
      this._playerManager.setReady(socket.id, true, 'song')
    }))
  }
}

class SettingsHandler extends AbstractRequestHandler {
  _settings: GameSettings

  constructor(logger: AMQLogger, db: AMQDatabase, emitter: MessageEmitter, settings: GameSettings) {
    super(logger, db, emitter)
    this._settings = settings
  }

  start(socket: socketio.Socket): void {
    socket.on('SYNC_SETTINGS', exceptionHandler(socket, () => {
      this._logger.writeLog('SETTING001', { id: socket.id })
      this._emitter.syncGameSetting(this._settings.serialize(), socket)
    }))

    socket.on('UPDATE_SETTINGS', exceptionHandler(socket, (settings: SettingObj) => {
      this._settings.update(settings)
      this._emitter.syncGameSetting(this._settings.serialize())
    }))
  }
}

class GameStateHandler extends AbstractRequestHandler {
  _gameState: GameState

  constructor(logger: AMQLogger, db: AMQDatabase, emitter: MessageEmitter, gameState: GameState) {
    super(logger, db, emitter)
    this._gameState = gameState
  }

  start(socket: socketio.Socket): void {
    socket.on('SONG_OVERRIDE', exceptionHandler(socket, (song: Song) => {
      this._gameState.songOverride = song
      let anime = song['anime'][0]
      let title = song['title']
      this._logger.writeLog('GAME008', { title: title,
                                         artist: song['artist'],
                                         anime: anime,
                                         type: song['type'],
                                         id: socket.id })
      this._emitter.notification('success', `Song selected: ${anime} - ${title}`, socket)
    }))
  }
}

export { GameHandler }