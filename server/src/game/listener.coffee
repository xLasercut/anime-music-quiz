PlayerManagement = require './player-management.coffee'
GameSettings = require './game-settings.coffee'
GameState = require './game-state.coffee'
Chat = require './chat.coffee'
{ userLists } = require '../shared-classes.coffee'

class GameListener
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject
    @playerManagement = new PlayerManagement(io, logObject)
    @gameSettings = new GameSettings(io, logObject)
    @gameState = new GameState(io, logObject)
    @chat = new Chat(io, logObject)
    @timeout = null
    @game = null

  listen: (socket) ->
    @playerManagement.listen(socket)
    @gameSettings.listen(socket)

    socket.on 'disconnect', () =>
      if @playerManagement.isPlayer(socket.id)
        @playerManagement.removePlayer(socket.id)
        if @playerManagement.isEmpty()
          @gameState.reset()
          @logObject.writeLog('GAME001')

    socket.on 'LOGIN_GAME', (player) =>
      @playerManagement.addPlayer(player, socket.id, socket.admin)
      socket.emit('SYNC_USER_LIST_FILES', userLists.files)
      socket.emit('SYNC_PLAYING', @gameState.playing)
      socket.emit('SYNC_CHOICES', @gameState.choices())
      socket.emit('SYNC_SETTINGS', @gameSettings.serialize())

    socket.on 'START_GAME', () =>
      @playerManagement.resetScore()
      @gameState.generateGameList(@gameSettings.songCount, @gameSettings.lists)
      if @gameState.gameList.length > 0
        @gameState.startGame(@gameSettings.mode)
        @newRound()
      else
        @chat.system('Empty song list')

    socket.on 'SET_BET', (bet) =>
      @playerManagement.changeBet(socket.id, bet)
      if @playerManagement.canProgress(socket.id)
        @gameState.newSong()

    socket.on 'SONG_LOADED', () =>
      if @playerManagement.canProgress(socket.id)
        @io.emit('START_COUNTDOWN', @gameSettings.guessTime)
        @timeout = setTimeout(() =>
          @io.emit('TIME_UP')
        , @gameSettings.guessTime * 1000)

    socket.on 'GUESS', (guess) =>
      point = @gameState.pointScored(guess, @playerManagement.playerBet(socket.id))
      @playerManagement.songOver(guess, point, socket.id)
      if @playerManagement.canProgress(socket.id)
        @io.emit('SHOW_GUESS')
        if @gameState.gameEnd()
          @logObject.writeLog('GAME003')
          clearTimeout(@timeout)
          @gameState.reset()
        else
          @timeout = setTimeout( () =>
            @newRound()
          , 10000)

    socket.on 'STOP_GAME', () =>
      clearTimeout(@timeout)
      @gameState.reset()
      @playerManagement.readyClear()


  newRound: () ->
    if @gameSettings.mode == 'gamble'
      @io.emit('PLACE_BET', 10)
      @timeout = setTimeout( () =>
        @io.emit('CLOSE_BET')
      , 10000)
    else
      @gameState.newSong()

module.exports = GameListener