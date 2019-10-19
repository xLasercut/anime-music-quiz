class MiscManager
  constructor: (io, logger, db) ->
    this.io = io
    this.logger = logger
    this.db = db

  startListeners: (socket) ->
    socket.on 'LOGIN_MISC', () =>
      try
        socket.emit('SYNC_EMOJI_DATA', this.db.emojiList)
      catch e
        this._logUnhandledError(e)

    socket.on 'SYNC_EMOJI_DATA', () =>
      try
        socket.emit('SYNC_EMOJI_DATA', this.db.emojiList)
      catch e
        this._logUnhandledError(e)

    socket.on 'ADD_EMOJI', (emoji) =>
      try
        this.logger.writeLog('EMOJI001', {
          command: emoji.command,
          src: emoji.src,
          type: emoji.type
        })
        this.db.addEmoji(emoji)
        this._syncEmojiData()
      catch e
        this._logUnhandledError(e)

    socket.on 'REMOVE_EMOJI', (emoji) =>
      try
        this.logger.writeLog('EMOJI002', {
          command: emoji.command,
          src: emoji.src,
          type: emoji.type
        })
        this.db.removeEmoji(emoji)
        this._syncEmojiData()
      catch e
        this._logUnhandledError(e)

  _syncEmojiData: () ->
    this.io.emit('SYNC_EMOJI_DATA', this.db.emojiList)

  _logUnhandledError: (e) ->
    this.logger.writeLog('SERVER004', { msg: e.message })

module.exports = MiscManager