Notification = require './notification.coffee'

class AdminManager
  constructor: (io, logger, gameManager, list, db) ->
    this.io = io
    this.logger = logger
    this.gameManager = gameManager
    this.list = list
    this.notification = new Notification(io)
    this.db = db

  startListeners: (socket) ->
    socket.on 'ADMIN_RELOAD_DATABASE', () =>
      try
        if this._isAdmin(socket)
          this.db.loadDb()
          this.io.emit('SYNC_CHOICES', this.db.choices)
          this.io.emit('SYNC_FULL_LIST', this.db.songList)
          this.io.emit('SYNC_EMOJI_DATA', this.db.emojiList)
          for file of this.db.userLists
            data = {
              file: file,
              list: this.db.userLists[file]
            }
            this.io.emit('SYNC_USER_LIST', data)
          this.logger.writeLog('ADMIN001', { id: socket.id, admin: socket.admin })
          this.notification.all('success', 'Game database reloaded')
      catch e
        this._logUnhandledError(e)

    socket.on 'ADMIN_KICK_PLAYER', (id) =>
      try
        if this._isAdmin(socket)
          client = this.io.nsps['/'].connected[id]
          if client
            client.emit('SYSTEM_NOTIFICATION', 'error', 'You have been kicked')
            username = this.gameManager.players.players[id].username
            this.gameManager.chat.systemMsg("#{username} has been kicked")
            client.disconnect()
            this.logger.writeLog('ADMIN002', {
              id: socket.id,
              admin: socket.admin,
              idKicked: id,
              username: username
            })
      catch e
        this._logUnhandledError(e)

    socket.on 'ADMIN_SYSTEM_MESSAGE', (type, message) =>
      try
        if this._isAdmin(socket)
          this.notification.all(type, message)
      catch e
        this._logUnhandledError(e)

    socket.on 'ADMIN_CHANGE_PLAYER_NAME', (id, username) =>
      try
        if this._isAdmin(socket)
          this.gameManager.players.changeName(id, username)
          this.logger.writeLog('ADMIN004', {
            id: socket.id,
            admin: socket.admin,
            idChanged: id,
            newName: username
          })
          this.notification.client(id, 'warning', "Your username has been changed to: #{username}")
      catch e
        this._logUnhandledError(e)

    socket.on 'ADMIN_SYNC_PLAYER_LIST', (_data, callback) =>
      try
        if this._isAdmin(socket)
          callback(this.gameManager.players.serialize())
      catch e
        this._logUnhandledError(e)

    socket.on 'ADMIN_EDIT_SONG_LIST', (song) =>
      try
        if this._isAdmin(socket)
          success = this.db.editSongList(song)
          if success
            this.logger.writeLog('ADMIN005', {
              id: socket.id,
              admin: socket.admin,
              songId: song.songId,
              anime: song.anime.join('|'),
              src: song.src,
              title: song.title,
              artist: song.artist,
              type: song.type
            })
            this.notification.client(socket.id, 'success', "#{song.anime[0]}: #{song.title} edited")
      catch e
        this._logUnhandledError(e)

    socket.on 'ADMIN_ADD_SONG_TO_LIST', (song) =>
      try
        if this._isAdmin(socket)
          this.db.addSongToSongList(song)
          this.logger.writeLog('ADMIN006', {
            id: socket.id,
            admin: socket.admin,
            songId: song.songId,
            anime: song.anime.join('|'),
            src: song.src,
            title: song.title,
            artist: song.artist,
            type: song.type
          })
          this.notification.client(socket.id, 'success', "#{song.anime[0]}: #{song.title} added")
      catch e
        this._logUnhandledError(e)

    socket.on 'ADMIN_REMOVE_SONG_FROM_LIST', (song) =>
      try
        if this._isAdmin(socket)
          success = this.db.removeSongFromSongList(song)
          if success
            this.logger.writeLog('ADMIN007', {
              id: socket.id,
              admin: socket.admin,
              songId: song.songId,
              anime: song.anime.join('|'),
              src: song.src,
              title: song.title,
              artist: song.artist,
              type: song.type
            })
            this.notification.client(socket.id, 'success', "#{song.anime[0]}: #{song.title} deleted")
      catch e
        this._logUnhandledError(e)

  _isAdmin: (socket) ->
    if socket.admin
      return true
    socket.disconnect()
    this.logger.writeLog('ADMIN003', { id: socket.id })
    return false

  _reloadUserLists: (socket) ->
    userLists.reload()
    for file of userLists.lists
      this.list.syncUserList(file, socket)

  _logUnhandledError: (e) ->
    this.logger.writeLog('SERVER004', { msg: e.message })

module.exports = AdminManager