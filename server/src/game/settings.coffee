if process.env.NODE_ENV == 'test'
  lists = [ 'test-user', 'test-user2' ]
else
  lists = []

class Settings
  constructor: (io, logger, chat) ->
    this.io = io
    this.logger = logger
    this.chat = chat
    this.songCount = 20
    this.guessTime = 30
    this.lists = lists
    this.mode = 'normal'
    this.duplicate = false
    this.selectTime = 20

  startListeners: (socket) ->
    socket.on 'SYNC_SETTINGS', () =>
      this.logger.writeLog('SETTING001', { id: socket.id })
      socket.emit('SYNC_SETTINGS', this.serialize())

    socket.on 'UPDATE_SETTINGS', (settings) =>
      this.songCount = settings.songCount
      this.guessTime = settings.guessTime
      this.lists = settings.lists
      this.mode = settings.mode
      this.duplicate = settings.duplicate
      this.selectTime = settings.selectTime

      this.logger.writeLog('SETTING002', {
        songCount: this.songCount,
        guessTime: this.guessTime,
        mode: this.mode,
        lists: this.lists.join('|'),
        duplicate: this.duplicate,
        selectTime: this.selectTime
      })
      this.io.emit('SYNC_SETTINGS', this.serialize())
      this.chat.systemMsg('Game settings updated')

  serialize: () ->
    return {
      songCount: this.songCount,
      guessTime: this.guessTime,
      lists: this.lists,
      mode: this.mode,
      duplicate: this.duplicate,
      selectTime: this.selectTime
    }

module.exports = Settings