{ animeChoices, userLists, songChoices, fullList } = require '../shared-classes.coffee'
Chat = require '../game/chat.coffee'

class AdminListener
  constructor: (io, logObject, game, list) ->
    @io = io
    @logObject = logObject
    @game = game
    @list = list
    @chat = new Chat(io, logObject)

  listen: (socket) ->
    socket.on 'ADMIN_RELOAD_DATABASE', () =>
      if @isAdmin(socket)
        @updateUserLists()
        @updateChoices()
        fullList.reload()
        @io.emit('SYNC_FULL_LIST', fullList.read())
        @logObject.writeLog('ADMIN001', { id: socket.id, admin: socket.admin })

    socket.on 'ADMIN_KICK_PLAYER', (id) =>
      if @isAdmin(socket)
        client = @io.nsps['/'].connected[id]
        if client
          client.emit('KICKED')
          username = @game.playerManagement.playerName(id)
          @chat.system("#{username} has been kicked")
          client.disconnect()
          @logObject.writeLog('ADMIN002', {
            id: socket.id,
            admin: socket.admin,
            idKicked: id,
            username: username
          })

    socket.on 'ADMIN_SYSTEM_MESSAGE', (message) =>
      if @isAdmin(socket)
        @chat.system(message)

    socket.on 'ADMIN_SYNC_PLAYER_LIST', (_data, callback) =>
      if @isAdmin(socket)
        callback(@game.playerManagement.serialize())

  isAdmin: (socket) ->
    if socket.admin
      return true
    socket.disconnect()
    @logObject.writeLog('ADMIN003', { id: socket.id })
    return false

  updateChoices: () ->
    animeChoices.reload()
    songChoices.reload()
    choices = {
      anime: animeChoices.read(),
      song: songChoices.read()
    }
    @io.emit('SYNC_CHOICES', choices)

  updateUserLists: () ->
    userLists.reload()
    for file of userLists.lists
      @io.emit('SYNC_USER_LIST', userLists.singleList(file), file)

module.exports = AdminListener