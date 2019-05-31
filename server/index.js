const express = require('express')
const app = express()
const GameState = require('./src/game-state.js')
const Players = require('./src/players.js')
const Chat = require('./src/chat.js')
const AnimeListManager = require('./src/anime-list-manager.js')
const logger = require('./src/logger.js')

const server = app.listen(3001, function() {
  logger.info('server running on port 3001')
})

const io = require('socket.io')(server)
var players = new Players(io, logger)
var gameState = new GameState(io, logger)
var chat = new Chat(io, logger)
var animeListManager = new AnimeListManager(logger)

var timeout = null

io.on('connection', function(socket) {
  logger.info(`new connection made - ${socket.id}`)

  socket.on('LOGIN', function(player) {
    logger.info(`received login request from - ${socket.id}`)
    players.addPlayer(player, socket.id)
    socket.emit('UPDATE_CHOICES', animeListManager.choices)
    socket.emit('UPDATE_CLIENT_SETTINGS', gameState.settings)
    socket.emit('UPDATE_PLAYING', gameState.playing)
    chat.systemMsg(`${player.username} has joined the room`)
  })

  socket.on('disconnect', function() {
    if (socket.id in players.list) {
      chat.systemMsg(`${players.list[socket.id]['username']} has left the room`)
      players.removePlayer(socket.id)
    }
    logger.info(`disconnected - ${socket.id}`)
    if (Object.keys(players.list).length < 1) {
      logger.info('zero players connected. server status reset')
      clearTimeout(timeout)
      gameState.reset()
    }
  })

  socket.on('SEND_MESSAGE', function(message) {
    chat.userMsg(message, players.username(socket.id))
  })

  socket.on('START_GAME', function() {
    logger.info('start new round')
    var gameList = animeListManager.generateGameList(gameState.settings)
    if (gameList.length > 0) {
      gameState.startGame(gameList)
      players.resetScore()
      gameState.newSong()
    }
    else {
      chat.systemMsg('Empty song list')
    }
  })

  socket.on('SONG_LOADED', function() {
    players.ready(socket.id)
    if (players.allReady()) {
      io.emit('START_COUNTDOWN', gameState.settings.guessTime)
      players.clearReady()
      var d = new Date()
      logger.info(`countdown started at ${d.getTime()}`)
      timeout = setTimeout(function () {
        var d = new Date()
        logger.info(`countdown finished at ${d.getTime()}`)
        io.emit('TIME_UP')
      }, gameState.settings.guessTime * 1000)
    }
  })

  socket.on('GUESS', function(guess) {
    players.setGuess(socket.id, guess)
    players.ready(socket.id)
    var point = gameState.calculatePoints(guess)
    players.addPoint(socket.id, point)
    if (players.allReady()) {
      players.clearReady()
      io.emit('SHOW_GUESS')
      if (gameState.roundEnd()) {
        logger.info('round ended')
        clearTimeout(timeout)
        gameState.reset()
      }
      else {
        timeout = setTimeout(function() {
          gameState.newSong()
        }, 10000)
      }
    }
  })

  socket.on('SYNC_SETTINGS', function() {
    socket.emit('UPDATE_CLIENT_SETTINGS', gameState.settings, animeListManager.userListFiles)
  })

  socket.on('UPDATE_SERVER_SETTINGS', function(settings) {
    gameState.updateSettings(settings)
    chat.systemMsg('Settings updated')
  })

  socket.on('LOBBY', function() {
    clearTimeout(timeout)
    gameState.reset()
    players.clearReady()
  })

  socket.on('GET_ALL_ANIME', function() {
    socket.emit('UPDATE_ALL_ANIME', animeListManager.completeList)
  })

  socket.on('GET_USER_LIST', function(filename) {
    socket.emit('UPDATE_USER_LIST', animeListManager.getUserList(filename), filename)
  })

  socket.on('UPDATE_USER_LIST', function(list, filename) {
    if (filename.match(/.*\.json$/gi)) {
      try {
        animeListManager.updateUserList(filename, list)
        io.emit('UPDATE_USER_LIST', animeListManager.getUserList(filename), filename)
      }
      catch (e) {
        logger.error(e)
      }
    }
    else {
      logger.error(`incorrect filename to write - filename=${filename}`)
    }
  })

  socket.on('GET_USER_LIST_FILES', function() {
    socket.emit('USER_LIST_FILES', animeListManager.userListFiles)
  })
})