PlayerManagement = require './player-management.coffee'
GameSettings = require './game-settings.coffee'
GameState = require './game-state.coffee'
Chat = require './chat.coffee'

class GameListener
  constructor: (io, logger) ->
    @io = io
    @logger = logger
    @playerManagement = new PlayerManagement(io, logger)
    @gameSettings = new GameSettings(io, logger)
    @gameState = new GameState(io, logger)
    @chat = new Chat(io)

  listen: (socket) ->
    @playerManagement.listen(socket)
    @gameSettings.listen(socket)
    @gameState.listen(socket)

    socket.on 'disconnect', () =>
      if @playerManagement.isPlayer(socket.id)
        @playerManagement.removePlayer(socket.id)
        @logger
        if @playerManagement.isEmpty()
          @gameState.reset()
          @logger.debug('zero players connected. resetting server status')
      @logger.info("disconnected - #{socket.id}")

    socket.on 'START_GAME', () =>
      @logger.info('start new round')
      @playerManagement.resetScore()
      @gameState.generateGameList(@gameSettings.songCount, @gameSettings.lists)
      if @gameState.gameList.length > 0
        @gameState.startGame()
        @gameState.newSong()
      else
        @chat.system('Empty song list')
      if (this.gameList.length > 0) {
        this.startGame()
        players.resetScore()
        this.newSong()
      }
      else {
        this.chat.systemMsg('Empty song list')
      }
module.exports = GameListener