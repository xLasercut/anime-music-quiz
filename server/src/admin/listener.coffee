{ animeChoices, userLists, songChoices, fullList, chatBotList, songStats, emojiList } = require '../shared-classes.coffee'
Notification = require './notification.coffee'

class AdminListener
  constructor: (io, logObject, game, list) ->
    @io = io
    @logObject = logObject
    @game = game
    @list = list
    @notification = new Notification(io)

  listen: (socket) ->
    socket.on 'ADMIN_RELOAD_DATABASE', () =>
      if @_isAdmin(socket)
        @_reloadUserLists(socket)
        @_reloadChoices()
        @_reloadFullList()
        @_reloadEmojiList()
        chatBotList.reload()
        @logObject.writeLog('ADMIN001', { id: socket.id, admin: socket.admin })
        @notification.all('success', 'Game database reloaded')

    socket.on 'ADMIN_KICK_PLAYER', (id) =>
      if @_isAdmin(socket)
        client = @io.nsps['/'].connected[id]
        if client
          client.emit('SYSTEM_NOTIFICATION', 'error', 'You have been kicked')
          username = @game.players.players[id].username
          @game.chat.systemMsg("#{username} has been kicked")
          client.disconnect()
          @logObject.writeLog('ADMIN002', {
            id: socket.id,
            admin: socket.admin,
            idKicked: id,
            username: username
          })

    socket.on 'ADMIN_SYSTEM_MESSAGE', (type, message) =>
      if @_isAdmin(socket)
        @notification.all(type, message)

    socket.on 'ADMIN_CHANGE_PLAYER_NAME', (id, username) =>
      if @_isAdmin(socket)
        @game.players.changeName(id, username)
        @logObject.writeLog('ADMIN004', {
          id: socket.id,
          admin: socket.admin,
          idChanged: id,
          newName: username
        })
        @notification.client(id, 'warning', "Your username has been changed to: #{username}")

    socket.on 'ADMIN_SYNC_PLAYER_LIST', (_data, callback) =>
      if @_isAdmin(socket)
        callback(@game.players.serialize())

    socket.on 'ADMIN_DOWNLOAD_SONG_STATS', (_data, callback) =>
      if @_isAdmin(socket)
        callback(songStats.read())

  _isAdmin: (socket) ->
    if socket.admin
      return true
    socket.disconnect()
    @logObject.writeLog('ADMIN003', { id: socket.id })
    return false

  _reloadChoices: () ->
    animeChoices.reload()
    songChoices.reload()
    @io.emit('SYNC_CHOICES', @game.gameState.choices())

  _reloadUserLists: (socket) ->
    userLists.reload()
    for file of userLists.lists
      @list.syncUserList(file, socket)

  _reloadEmojiList: () ->
    emojiList.reload()
    @io.emit('SYNC_EMOJI_DATA', emojiList.read())

  _reloadFullList: () ->
    fullList.reload()
    @io.emit('SYNC_FULL_LIST', fullList.read())

module.exports = AdminListener