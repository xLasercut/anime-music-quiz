Player = require './player.coffee'
ScoreCalculator = require './score-calculator.coffee'

class PlayerManager
  constructor: (io, logger, chat) ->
    this.io = io
    this.logger = logger
    this.players = {}
    this.chat = chat

  startListeners: (socket) ->
    socket.on 'USER_MESSAGE', (message) =>
      this.chat.userMsg(this.players[socket.id], socket, message)

    socket.on 'SONG_LOADED', () =>
      this.players[socket.id].setReady(true, 'song')

    socket.on 'GUESS', (guess) =>
      this.players[socket.id].setGuess(guess)
      this.players[socket.id].setReady(true, 'guess')
      this.logger.writeLog('GAME007', { song: guess.song, anime: guess.anime })

    socket.on 'SONG_OVERRIDE', (song, _callback) =>
      this.players[socket.id].setReady(true, 'select')

    socket.on 'PLAYER_READY', () =>
      this.players[socket.id].setReady(true, 'guess')

  addPlayer: (player, id, admin) ->
    host = false
    if Object.keys(this.players).length == 0
      host = true

    this.players[id] = new Player(player, host, admin)
    this._updateClient()
    name = this.players[id].username
    this.chat.systemMsg("#{name} has joined the room")
    this.logger.writeLog('PLAYER001', { id: id, username: name })

  removePlayer: (id) ->
    name = this.players[id].username
    this.logger.writeLog('PLAYER002', { id: id, username: name })
    delete this.players[id]
    this._moveHost()
    this._updateClient()
    this.chat.systemMsg("#{name} has left the room")

  _moveHost: () ->
    if !this.isEmpty()
      id = Object.keys(this.players)[0]
      this.players[id].setHost()
      this.logger.writeLog('PLAYER003', { id: id, username: this.players[id].username })

  changeName: (id, name) ->
    this.players[id].changeName(name)
    this._updateClient()

  resetScore: () ->
    for _id, player of this.players
      player.resetScore()
    this._updateClient()

  checkAllReady: (type) ->
    for _id, player of this.players
      if !player.ready[type]
        return false
    this.readyClear()
    return true

  checkSingleReady: (id, type) ->
    if this.players[id] && this.players[id].ready[type]
      this.readyClear()
      return true
    return false

  newRound: () ->
    for _id, player of this.players
      player.newRound()
    this._updateClient()

  songOver: (currentSong) ->
    this.logger.writeLog('GAME006')
    scoreCalculator = new ScoreCalculator(currentSong)
    for _id, player of this.players
      score = scoreCalculator.calculateScore(player.guess)
      player.addPoint(score.point)
      player.setColor(score.color)
    this._updateClient()
    this.io.emit('SHOW_GUESS')

  readyClear: () ->
    for _id, player of this.players
      player.setReady(false, 'select')
      player.setReady(false, 'song')
      player.setReady(false, 'guess')

  isPlayer: (id) ->
    return (id of this.players)

  isEmpty: () ->
    return Object.keys(this.players).length == 0

  serialize: () ->
    players = {}

    for id, player of this.players
      players[id] = player.serialize()

    return players

  _updateClient: () ->
    this.io.emit('SYNC_PLAYERS', this.serialize())

  randomId: () ->
    keys = Object.keys(this.players)
    return keys[Math.floor(Math.random() * keys.length)]


module.exports = PlayerManager