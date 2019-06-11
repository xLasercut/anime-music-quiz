Chat = require './chat.coffee'

class GameSettings
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject
    @chat = new Chat(io, logObject)
    @songCount = 20
    @guessTime = 25
    @lists = []
    @mode = 'normal'

  listen: (socket) ->
    socket.on 'SYNC_SETTINGS', () =>
      @logObject.writeLog('SETTING001', { id: socket.id })
      socket.emit('SYNC_SETTINGS', @serialize())

    socket.on 'UPDATE_SETTINGS', (settings) =>
      @songCount = settings.songCount
      @guessTime = settings.guessTime
      @lists = settings.lists
      @mode = settings.mode

      @logObject.writeLog('SETTING002', {
        songCount: @songCount,
        guessTime: @guessTime,
        mode: @mode,
        lists: @lists.join('|')
      })
      @io.emit('SYNC_SETTINGS', @serialize())
      @chat.system('Game settings updated')

  serialize: () ->
    return {
      songCount: @songCount,
      guessTime: @guessTime,
      lists: @lists,
      mode: @mode
    }

module.exports = GameSettings