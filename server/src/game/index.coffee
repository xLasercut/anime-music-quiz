Chat = require './chat.coffee'
PlayerManager = require './player-manager.coffee'
GameState = require './game-state.coffee'
Settings = require './settings.coffee'
Timer = require './timer.coffee'

class GameManager
  constructor: (io, logger, db) ->
    this.io = io
    this.logger = logger
    this.db = db
    this.gameState = new GameState(io, logger, db)
    this.chat = new Chat(io, logger, db)
    this.playerManager = new PlayerManager(io, logger, this.chat)
    this.settings = new Settings(io, logger, this.chat)
    this.timer = new Timer()

  startListeners: (socket) ->
    this.gameState.startListeners(socket)
    this.playerManager.startListeners(socket)
    this.settings.startListeners(socket)

    socket.on 'disconnect', () =>
      try
        if this.playerManager.isPlayer(socket.id)
          this.playerManager.removePlayer(socket.id)
          if this.playerManager.isEmpty()
            this.resetGame()
            this.logger.writeLog('GAME001')
      catch e
        this._logUnhandledError(e)

    socket.on 'LOGIN_GAME', (player) =>
      try
        this.playerManager.addPlayer(player, socket.id, socket.admin)
        socket.emit('SYNC_USER_LIST_FILES', this.db.userFiles)
        socket.emit('SYNC_PLAYING', this.gameState.playing)
        socket.emit('SYNC_CHOICES', this.db.choices)
        socket.emit('SYNC_SETTINGS', this.settings.serialize())
        socket.emit('SYNC_EMOJI_DATA', this.db.emojiList)
        socket.emit('SYNC_FULL_LIST', this.db.songList)
      catch e
        this._logUnhandledError(e)

    socket.on 'START_GAME', () =>
      try
        this.playerManager.resetScore()
        this.gameState.generateGameList(this.settings)
        if this.gameState.gameList.length > 0
          this.gameState.startGame(this.settings.mode)
          this.newRound()
        else
          this.chat.systemMsg('Empty song list')
      catch e
        this._logUnhandledError(e)

    socket.on 'STOP_GAME', () =>
      try
        this.resetGame()
      catch e
        this._logUnhandledError(e)

  resetGame: () ->
    this.timer.resetCountdown()
    this.timer.resetTimeout()
    this.gameState.reset()
    this.playerManager.readyClear()

  newRound: () ->
    this.playerManager.newRound()
    this.io.emit('RESET_SELECTOR')
    if this.settings.mode == 'selector'
      this._gameFlowSelector()
    else
      this._gameFlowMain()

  _gameFlowMain: () ->
    this.gameState.newSong()
    this.timer.startCountdown(5000, this.playerManager, 'song')
    .then () =>
      this.io.emit('START_COUNTDOWN', this.settings.guessTime)
      return this.timer.startCountdown(this.settings.guessTime * 1000, this.playerManager, 'guess')
    .then () =>
      this.io.emit('TIME_UP')
      return this.timer.startCountdown(5000, this.playerManager, 'guess')
    .then () =>
      this.playerManager.songOver(this.gameState.currentSong, this.settings.mode)
      if this.gameState.gameEnd()
        this.logger.writeLog('GAME003')
        this.gameState.reset()
        return this.timer.newRound(false)
      else
        return this.timer.newRound(true)
    .then (newRound) =>
      if newRound
        this.newRound()
    .catch (err) =>
      this.logger.writeLog('SERVER004', { msg: err })

  _gameFlowSelector: () ->
    id = this.playerManager.randomId()
    client = this.io.nsps['/'].connected[id]
    client.emit('SELECT_SONG', this.settings.selectTime)
    this.timer.startCountdownSingle(this.settings.selectTime * 1000, this.playerManager, id, 'select')
    .then () =>
      client.emit('SELECT_SONG_OVER')
      this._gameFlowMain()
    .catch (err) =>
      this.logger.writeLog('SERVER004', { msg: err })

  _logUnhandledError: (e) ->
    this.logger.writeLog('SERVER004', { msg: e.message })

module.exports = GameManager
