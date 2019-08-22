Players = require './players.coffee'
Settings = require './settings.coffee'
GameState = require './game-state.coffee'
Chat = require './chat.coffee'
Timer = require './timer.coffee'
q = require 'q'
{ userLists, songStats, emojiList, fullList } = require '../shared-classes.coffee'

class GameListener
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject
    @chat = new Chat(io, logObject)
    @players = new Players(io, logObject, @chat)
    @settings = new Settings(io, logObject, @chat)
    @gameState = new GameState(io, logObject)
    @timer = new Timer()
    @statsSaver = setInterval () =>
      if @gameState.playing
        songStats.write()
    , 300000

  listen: (socket) ->
    @players.listen(socket)
    @settings.listen(socket)
    @gameState.listen(socket)

    socket.on 'disconnect', () =>
      try
        if @players.isPlayer(socket.id)
          @players.removePlayer(socket.id)
          if @players.isEmpty()
            @resetGame()
            @logObject.writeLog('GAME001')
      catch e
        @_logUnhandledError(e)

    socket.on 'LOGIN_GAME', (player) =>
      try
        @players.addPlayer(player, socket.id, socket.admin)
        socket.emit('SYNC_USER_LIST_FILES', userLists.files)
        socket.emit('SYNC_PLAYING', @gameState.playing)
        socket.emit('SYNC_CHOICES', @gameState.choices())
        socket.emit('SYNC_SETTINGS', @settings.serialize())
        socket.emit('SYNC_EMOJI_DATA', emojiList.read())
        socket.emit('SYNC_FULL_LIST', fullList.read())
      catch e
        @_logUnhandledError(e)

    socket.on 'START_GAME', () =>
      try
        @players.resetScore()
        @gameState.generateGameList(@settings)
        if @gameState.gameList.length > 0
          @gameState.startGame(@settings.mode)
          @newRound()
        else
          @chat.systemMsg('Empty song list')
      catch e
        @_logUnhandledError(e)

    socket.on 'STOP_GAME', () =>
      try
        @resetGame()
      catch e
        @_logUnhandledError(e)
  resetGame: () ->
    @timer.resetCountdown()
    @timer.resetTimeout()
    @gameState.reset()
    @players.readyClear()
    songStats.write()

  newRound: () ->
    @players.newRound()
    @io.emit('RESET_SELECTOR')
    if @settings.mode == 'selector'
      @_gameFlowSelector()
    else
      @_gameFlowMain()

  _gameFlowMain: () ->
    @gameState.newSong()
    @timer.startCountdown(5000, @players, 'song')
    .then () =>
      @io.emit('START_COUNTDOWN', @settings.guessTime)
      return @timer.startCountdown(@settings.guessTime * 1000, @players, 'guess')
    .then () =>
      @io.emit('TIME_UP')
      return @timer.startCountdown(5000, @players, 'guess')
    .then () =>
      @players.songOver(@gameState.currentSong, @settings.mode)
      if @gameState.gameEnd()
        @logObject.writeLog('GAME003')
        @gameState.reset()
        return @timer.newRound(false)
      else
        return @timer.newRound(true)
    .then (newRound) =>
      if newRound
        @newRound()
      else
        songStats.write()
    .catch (err) =>
      @logObject.writeLog('SERVER004', { msg: err })

  _gameFlowSelector: () ->
    id = @players.randomId()
    client = @io.nsps['/'].connected[id]
    client.emit('SELECT_SONG')
    @timer.startCountdownSingle(10000, @players, id, 'select')
    .then () =>
      client.emit('SELECT_SONG_OVER')
      @_gameFlowMain()
    .catch (err) =>
      @logObject.writeLog('SERVER004', { msg: err })

  _logUnhandledError: (e) ->
    @logObject.writeLog('SERVER004', { msg: e.message })

module.exports = GameListener