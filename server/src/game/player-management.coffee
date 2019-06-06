Player = require './player.coffee'
Chat = require './chat.coffee'

class PlayerManagement
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject
    @players = {}
    @chat = new Chat(io, logObject)

  listen: (socket) ->
    socket.on 'USER_MESSAGE', (message) =>
      @chat.user(message, @playerName(socket.id))

  addPlayer: (player, id) ->
    host = false
    if Object.keys(@players).length == 0
      host = true

    @players[id] = new Player(player, host)
    @updateClient()
    @chat.system("#{@playerName(id)} has joined the room")
    @logObject.writeLog('PLAYER001', { id: id, username: @playerName(id) })

  removePlayer: (id) ->
    @chat.system("#{@playerName(id)} has left the room")
    @logObject.writeLog('PLAYER002', { id: id, username: @playerName(id) })
    delete @players[id]
    @moveHost()
    @updateClient()

  moveHost: () ->
    if !@isEmpty()
      id = Object.keys(@players)[0]
      @players[id].setHost()
      @logObject.writeLog('PLAYER003', { id: id, username: @playerName(id) })

  playerName: (id) ->
    return @players[id].username

  resetScore: () ->
    for _id, player of @players
      player.resetScore()
    @updateClient()

  playerReady: (id) ->
    @players[id].setReady()

  songOver: (guess, point, id) ->
    @players[id].setGuess(guess)
    @players[id].addPoint(point)
    @players[id].setReady()
    @updateClient()

  readyClear: () ->
    for _id, player of @players
      player.readyClear()

  isAllReady: () ->
    for _id, player of @players
      if !player.ready
        return false
    return true

  isPlayer: (id) ->
    return (id of @players)

  isEmpty: () ->
    return Object.keys(@players).length == 0

  serialize: () ->
    players = {}

    for id, player of @players
      players[id] = player.serialize()

    return players

  updateClient: () ->
    @io.emit('SYNC_PLAYERS', @serialize())


module.exports = PlayerManagement