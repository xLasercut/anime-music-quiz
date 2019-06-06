PlayerManagement = require './player-management.coffee'
GameSettings = require './game-settings.coffee'
GameState = require './game-state.coffee'
Chat = require './chat.coffee'
{ userLists } = require '../shared-classes.coffee'

class GameListener
  constructor: (io, logger) ->
    @io = io
    @logger = logger
    @playerManagement = new PlayerManagement(io, logger)
    @gameSettings = new GameSettings(io, logger)
    @gameState = new GameState(io, logger)
    @chat = new Chat(io)
    @timeout = null

  listen: (socket) ->
    @playerManagement.listen(socket)
    @gameSettings.listen(socket)

    socket.on 'disconnect', () =>
      if @playerManagement.isPlayer(socket.id)
        @playerManagement.removePlayer(socket.id)
        if @playerManagement.isEmpty()
          @gameState.reset()
          @logger.debug('zero players connected. resetting server status')
      @logger.info("disconnected - #{socket.id}")

    socket.on 'LOGIN_GAME', (player) =>
      @playerManagement.addPlayer(player, socket.id)
      socket.emit('SYNC_USER_LIST_FILES', userLists.files)
      socket.emit('SYNC_PLAYING', @gameState.playing)
      socket.emit('SYNC_CHOICES', @gameState.choices)
      socket.emit('SYNC_SETTINGS', @gameSettings.serialize())

    socket.on 'START_GAME', () =>
      @logger.info('start new round')
      @playerManagement.resetScore()
      @gameState.generateGameList(@gameSettings.songCount, @gameSettings.lists)
      if @gameState.gameList.length > 0
        @gameState.startGame()
        @gameState.newSong()
      else
        @chat.system('Empty song list')

    socket.on 'SONG_LOADED', () =>
      @playerManagement.playerReady(socket.id)
      if @playerManagement.isAllReady()
        @playerManagement.readyClear()
        @io.emit('START_COUNTDOWN')
        @timeout = setTimeout(() =>
          @io.emit('TIME_UP')
        , @gameSettings.guessTime * 1000)

    socket.on 'GUESS', (guess) =>
      @playerManagement.songOver(guess, @gameState.pointScored(guess), socket.id)
      if @playerManagement.isAllReady()
        @playerManagement.readyClear()
        @io.emit('SHOW_GUESS')
        if @gameState.roundEnd()
          @logger.info('round ended')
          clearTimeout(@timeout)
          @gameState.reset()
        else
          @timeout = setTimeout( () =>
            @gameState.newSong()
          , 10000)

    socket.on 'STOP_GAME', () =>
      clearTimeout(@timeout)
      @gameState.reset()
      @playerManagement.readyClear()

module.exports = GameListener