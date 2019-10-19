class ListManager
  constructor: (io, logger, db) ->
    this.io = io
    this.logger = logger
    this.db = db

  startListeners: (socket) ->
    socket.on 'LOGIN_LIST', () =>
      try
        socket.emit('SYNC_USER_LIST_FILES', this.db.userFiles)
      catch e
        this._logUnhandledError(e)

    socket.on 'SYNC_FULL_LIST', () =>
      try
        this.logger.writeLog('LIST002', { id: socket.id })
        socket.emit('SYNC_FULL_LIST', this.db.songList)
      catch e
        this._logUnhandledError(e)

    socket.on 'SYNC_USER_LIST', (file) =>
      try
        this.logger.writeLog('LIST003', { id: socket.id, filename: file })
        this.syncUserList(file, socket, true)
      catch e
        this._logUnhandledError(e)

    socket.on 'ADD_SONG', (song, file) =>
      try
        this.logger.writeLog('LIST004', {
          id: socket.id,
          anime: song.anime[0],
          title: song.title,
          songId: song.songId,
          filename: file
        })
        this.db.addUserSong(file, song.songId)
        this.syncUserList(file, socket)
      catch e
        this._logUnhandledError(e)

    socket.on 'REMOVE_SONG', (song, file) =>
      try
        this.logger.writeLog('LIST005', {
          id: socket.id,
          anime: song.anime[0],
          title: song.title,
          songId: song.songId,
          filename: file
        })
        this.db.removeUserSong(file, song.songId)
        this.syncUserList(file, socket)
      catch e
        this._logUnhandledError(e)

  syncUserList: (file, socket, single=false) ->
    data = {
      list: this.db.userLists[file],
      file: file
    }
    if single
      socket.emit('SYNC_USER_LIST', data)
    else
      this.io.emit('SYNC_USER_LIST', data)

  _logUnhandledError: (e) ->
    this.logger.writeLog('SERVER004', { msg: e.message })

module.exports = ListManager