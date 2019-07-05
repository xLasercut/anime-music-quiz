{ emojiList } =  require '../shared-classes.coffee'

class MiscListener
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject

  listen: (socket) ->
    socket.on 'LOGIN_MISC', () =>
      try
        socket.emit('SYNC_EMOJI_DATA', emojiList.read())
      catch e
        @_logUnhandledError(e)

    socket.on 'SYNC_EMOJI_DATA', () =>
      try
        socket.emit('SYNC_EMOJI_DATA', emojiList.read())
      catch e
        @_logUnhandledError(e)

    socket.on 'ADD_EMOJI', (emoji) =>
      try
        @logObject.writeLog('EMOJI001', {
          command: emoji.command,
          src: emoji.src,
          type: emoji.type
        })
        emojiList.add(emoji)
        @_syncEmojiData()
      catch e
        @_logUnhandledError(e)

    socket.on 'REMOVE_EMOJI', (emoji) =>
      try
        @logObject.writeLog('EMOJI002', {
          command: emoji.command,
          src: emoji.src,
          type: emoji.type
        })
        emojiList.remove(emoji)
        @_syncEmojiData()
      catch e
        @_logUnhandledError(e)

  _syncEmojiData: () ->
    @io.emit('SYNC_EMOJI_DATA', emojiList.read())

  _logUnhandledError: (e) ->
    @logObject.writeLog('SERVER004', { msg: e.message })

module.exports = MiscListener