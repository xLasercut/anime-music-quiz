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

    socket.on 'ADD_EMOJI', (emoji) =>
      @logObject.writeLog('EMOJI001', {
        command: emoji.command,
        src: emoji.src,
        type: emoji.type
      })
      emojiList.add(emoji)
      @_syncEmojiData()

    socket.on 'REMOVE_EMOJI', (emoji) =>
      @logObject.writeLog('EMOJI002', {
        command: emoji.command,
        src: emoji.src,
        type: emoji.type
      })
      emojiList.remove(emoji)
      @_syncEmojiData()

  _syncEmojiData: () ->
    @io.emit('SYNC_EMOJI_DATA', emojiList.read())

module.exports = MiscListener