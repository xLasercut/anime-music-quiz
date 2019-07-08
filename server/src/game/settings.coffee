if process.env.NODE_ENV == 'test'
  lists = [ 'test-user.json', 'test-user2.json' ]
else
  lists = []

class Settings
  constructor: (io, logObject, chat) ->
    @io = io
    @logObject = logObject
    @chat = chat
    @songCount = 20
    @guessTime = 25
    @lists = lists
    @mode = 'normal'
    @duplicate = false

  listen: (socket) ->
    socket.on 'SYNC_SETTINGS', () =>
      @logObject.writeLog('SETTING001', { id: socket.id })
      socket.emit('SYNC_SETTINGS', @serialize())

    socket.on 'UPDATE_SETTINGS', (settings) =>
      @songCount = settings.songCount
      @guessTime = settings.guessTime
      @lists = settings.lists
      @mode = settings.mode
      @duplicate = settings.duplicate

      @logObject.writeLog('SETTING002', {
        songCount: @songCount,
        guessTime: @guessTime,
        mode: @mode,
        lists: @lists.join('|'),
        duplicate: @duplicate
      })
      @io.emit('SYNC_SETTINGS', @serialize())
      @chat.systemMsg('Game settings updated')

  serialize: () ->
    return {
      songCount: @songCount,
      guessTime: @guessTime,
      lists: @lists,
      mode: @mode,
      duplicate: @duplicate
    }

module.exports = Settings