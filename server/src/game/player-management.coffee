Player = require './player.coffee'
Chat = require './chat.coffee'
ScoreCalculator = require './score-calculator.coffee'

class PlayerManagement
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject
    @players = {}
    @chat = new Chat(io, logObject)

  listen: (socket) ->
    socket.on 'USER_MESSAGE', (message) =>
      @chat.user(message, @playerName(socket.id), socket.admin)

    socket.on 'SONG_LOADED', () =>
      @players[socket.id].setReady(true)

    socket.on 'GUESS', (guess) =>
      @players[socket.id].setGuess(guess)
      @players[socket.id].setReady(true)
      @logObject.writeLog('GAME007', { song: guess.song, anime: guess.anime })

    socket.on 'SET_BET', (bet) =>
      @players[socket.id].setBet(bet)
      @players[socket.id].setReady(true)

  addPlayer: (player, id, admin) ->
    host = false
    if Object.keys(@players).length == 0
      host = true

    @players[id] = new Player(player, host, admin)
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

  changeName: (id, name) ->
    @players[id].changeName(name)
    @updateClient()

  playerName: (id) ->
    return @players[id].username

  resetScore: () ->
    for _id, player of @players
      player.resetScore()
    @updateClient()

  checkAllReady: () ->
    for _id, player of @players
      if !player.ready
        return false
    @readyClear()
    return true

  newRound: () ->
    for _id, player of @players
      player.newRound()
    @updateClient()

  songOver: (currentSong, gameMode) ->
    @logObject.writeLog('GAME006')
    scoreCalculator = new ScoreCalculator(gameMode, currentSong)
    for _id, player of @players
      score = scoreCalculator.calculateScore(player.guess, player.bet)
      player.addPoint(score.point)
      player.setColor(score.color)
    @updateClient()
    @io.emit('SHOW_GUESS')

  readyClear: () ->
    for _id, player of @players
      player.setReady(false)

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