Chat = require './chat.coffee'

class GameSettings
  constructor: (io, logger) ->
    @io = io
    @logger = logger
    @chat = new Chat(io)
    @songCount = 20
    @guessTime = 25
    @lists = []

  listen: (socket) ->
    socket.on 'SYNC_SETTINGS', () =>
      @logger.debug('sync settings requested by client')
      socket.emit('SYNC_SETTINGS', @serialize())

    socket.on 'UPDATE_SETTINGS', (settings) =>
      @songCount = settings.songCount
      @guessTime = settings.guessTime
      @lists = settings.lists

      @logger.info("settings updated - songCount=#{@songCount} guessTime=#{@guessTime} lists=#{JSON.stringify(@lists)}")
      @io.emit('SYNC_SETTINGS', @serialize())
      @chat.system('Game settings updated')

  serialize: () ->
    return {
      songCount: @songCount,
      guessTime: @guessTime,
      lists: @lists
    }

module.exports = GameSettings