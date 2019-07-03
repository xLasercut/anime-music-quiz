{ emojiList } =  require '../shared-classes.coffee'

class MiscListener
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject

  listen: (socket) ->
    socket.on 'LOGIN_MISC', () =>
      socket.emit('SYNC_EMOJI_DATA', emojiList.read())

    socket.on 'SYNC_EMOJI_DATA', () =>
      socket.emit('SYNC_EMOJI_DATA', emojiList.read())

    socket.on 'UPDATE_EMOJI_DATA', (data) =>
      @logObject.writeLog('EMOJI001', { id: socket.id })
      emojiList.update(data)
      emojiList.write()
      @io.emit('SYNC_EMOJI_DATA', emojiList.read())

module.exports = MiscListener