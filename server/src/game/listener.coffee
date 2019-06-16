PlayerManagement = require './player-management.coffee'
Settings = require './settings.coffee'
GameState = require './game-state.coffee'
Chat = require './chat.coffee'
Timer = require './timer.coffee'
q = require 'q'
{ userLists } = require '../shared-classes.coffee'

class GameListener
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject
    @playerManagement = new PlayerManagement(io, logObject)
    @settings = new Settings(io, logObject)
    @gameState = new GameState(io, logObject)
    @chat = new Chat(io, logObject)
    @timer = new Timer()

  listen: (socket) ->
    @playerManagement.listen(socket)
    @settings.listen(socket)

    socket.on 'disconnect', () =>
      if @playerManagement.isPlayer(socket.id)
        @playerManagement.removePlayer(socket.id)
        if @playerManagement.isEmpty()
          @resetGame()
          @logObject.writeLog('GAME001')

    socket.on 'LOGIN_GAME', (player) =>
      @playerManagement.addPlayer(player, socket.id, socket.admin)
      socket.emit('SYNC_USER_LIST_FILES', userLists.files)
      socket.emit('SYNC_PLAYING', @gameState.playing)
      socket.emit('SYNC_CHOICES', @gameState.choices())
      socket.emit('SYNC_SETTINGS', @settings.serialize())

    socket.on 'START_GAME', () =>
      @playerManagement.resetScore()
      @gameState.generateGameList(@settings.songCount, @settings.lists)
      if @gameState.gameList.length > 0
        @gameState.startGame(@settings.mode)
        @newRound()
      else
        @chat.system('Empty song list')

    socket.on 'STOP_GAME', () =>
      @resetGame()

  resetGame: () ->
    @timer.resetCountdown()
    @timer.resetTimeout()
    @gameState.reset()
    @playerManagement.readyClear()

  newRound: () ->
    @playerManagement.newRound()
    if @settings.mode == 'gamble'
      @gameFlowGamble()
    else
      @gameFlowMain()

  gameFlowMain: () ->
    @gameState.newSong()
    @timer.startCountdown(5000, @playerManagement)
    .then () =>
      @io.emit('START_COUNTDOWN', @settings.guessTime)
      return @timer.startCountdown(@settings.guessTime * 1000, @playerManagement)
    .then () =>
      @io.emit('TIME_UP')
      return @timer.startCountdown(5000, @playerManagement)
    .then () =>
      @playerManagement.songOver(@gameState.currentSong, @settings.mode)
      if @gameState.gameEnd()
        @logObject.writeLog('GAME003')
        @gameState.reset()
        return @timer.newRound(false)
      else
        return @timer.newRound(true)
    .then (newRound) =>
      if newRound
        @newRound()
    .catch (err) =>
      @logObject.writeLog('SERVER004', { msg: err })

  gameFlowGamble: () ->
    @io.emit('PLACE_BET', 10)
    @timer.startTimeout(10000)
    .then () =>
      @io.emit('CLOSE_BET')
      return @timer.startCountdown(5000, @playerManagement)
    .then () =>
      @gameFlowMain()
    .catch (err) =>
      @logObject.writeLog('SERVER004', { msg: err })

module.exports = GameListener