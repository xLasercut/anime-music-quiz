Player = require './player.coffee'
ScoreCalculator = require './score-calculator.coffee'
{ songStats } = require '../shared-classes.coffee'

class Players
  constructor: (io, logObject, chat) ->
    @io = io
    @logObject = logObject
    @players = {}
    @chat = chat

  listen: (socket) ->
    socket.on 'USER_MESSAGE', (message) =>
      @chat.userMsg(@players[socket.id], socket, message)

    socket.on 'SONG_LOADED', () =>
      @players[socket.id].setReady(true, 'song')

    socket.on 'GUESS', (guess) =>
      @players[socket.id].setGuess(guess)
      @players[socket.id].setReady(true, 'guess')
      @logObject.writeLog('GAME007', { song: guess.song, anime: guess.anime })

    socket.on 'SONG_OVERRIDE', (song, _callback) =>
      @players[socket.id].setReady(true, 'select')

    socket.on 'PLAYER_READY', () =>
      @players[socket.id].setReady(true, 'guess')

  addPlayer: (player, id, admin) ->
    host = false
    if Object.keys(@players).length == 0
      host = true

    @players[id] = new Player(player, host, admin)
    @updateClient()
    name = @players[id].username
    @chat.systemMsg("#{name} has joined the room")
    @logObject.writeLog('PLAYER001', { id: id, username: name })

  removePlayer: (id) ->
    name = @players[id].username
    @logObject.writeLog('PLAYER002', { id: id, username: name })
    delete @players[id]
    @moveHost()
    @updateClient()
    @chat.systemMsg("#{name} has left the room")

  moveHost: () ->
    if !@isEmpty()
      id = Object.keys(@players)[0]
      @players[id].setHost()
      @logObject.writeLog('PLAYER003', { id: id, username: @players[id].username })

  changeName: (id, name) ->
    @players[id].changeName(name)
    @updateClient()

  resetScore: () ->
    for _id, player of @players
      player.resetScore()
    @updateClient()

  checkAllReady: (type) ->
    for _id, player of @players
      if !player.ready[type]
        return false
    @readyClear()
    return true

  checkSingleReady: (id, type) ->
    if @players[id] && @players[id].ready[type]
      @readyClear()
      return true
    return false

  newRound: () ->
    for _id, player of @players
      player.newRound()
    @updateClient()

  songOver: (currentSong) ->
    @logObject.writeLog('GAME006')
    scoreCalculator = new ScoreCalculator(currentSong)
    songStats.updateSong(currentSong)
    for _id, player of @players
      score = scoreCalculator.calculateScore(player.guess)
      player.addPoint(score.point)
      player.setColor(score.color)
      songStats.updateUser(currentSong, score, player.username)
    @updateClient()
    @io.emit('SHOW_GUESS')

  readyClear: () ->
    for _id, player of @players
      player.setReady(false, 'bet')
      player.setReady(false, 'song')
      player.setReady(false, 'guess')

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

  randomId: () ->
    keys = Object.keys(@players)
    return keys[Math.floor(Math.random() * keys.length)]


module.exports = Players