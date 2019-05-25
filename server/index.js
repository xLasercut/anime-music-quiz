const express = require('express')
const app = express()
const GameState = require('./src/game-state.js')

const server = app.listen(3001, function() {
  console.log('server running on port 3001')
})

const io = require('socket.io')(server)
var players = require('./src/players.js')
var gameState = new GameState(io)
var animeListManager = require('./src/anime-list-manager.js')

var timeout = null

io.on('connection', function(socket) {
  console.log(`New connection made: ${socket.id}`)

  socket.on('LOGIN', function(player) {
    players.addPlayer(player, socket.id)
    socket.emit('UPDATE_CHOICES', animeListManager.choices)
    socket.emit('UPDATE_CLIENT_SETTINGS', gameState.settings)
    socket.emit('UPDATE_PLAYING', gameState.playing)
    io.emit('MESSAGE', { message: `${player.username} has joined the room` })
    io.emit('UPDATE_PLAYERS', players.list)
  })

  socket.on('disconnect', function() {
    io.emit('MESSAGE', { message: `${players.list[socket.id]['username']} has left the room` })
    players.removePlayer(socket.id)
    io.emit('UPDATE_PLAYERS', players.list)
    console.log(`Disconnected: ${socket.id}`)
  })

  socket.on('SEND_MESSAGE', function(message) {
    var data = {
      user: players.username(socket.id),
      message: message
    }
    io.emit('MESSAGE', data)
  })

  socket.on('START_GAME', function() {
    gameState.startGame()
    players.resetScore()
    var song = animeListManager.getSong()
    gameState.newSong(song)
  })

  socket.on('SONG_LOADED', function() {
    players.ready(socket.id)
    if (players.allReady()) {
      io.emit('START_COUNTDOWN', gameState.settings.guessTime)
      players.clearReady()
      timeout = setTimeout(function () {
        io.emit('TIME_UP')
      }, gameState.settings.guessTime * 1000)
    }
  })

  socket.on('GUESS', function(guess) {
    players.setGuess(socket.id, guess)
    players.ready(socket.id)
    if (gameState.checkGuess(guess)) {
      players.addPoint(socket.id)
    }
    if (players.allReady()) {
      players.clearReady()
      io.emit('UPDATE_PLAYERS', players.list)
      io.emit('SHOW_GUESS')
      if (gameState.roundEnd()) {
        gameState.reset()
      }
      else {
        timeout = setTimeout(function() {
          var song = animeListManager.getSong()
          gameState.newSong(song)
        }, 10000)
      }
    }
  })

  socket.on('SYNC_SETTINGS', function() {
    io.emit('UPDATE_CLIENT_SETTINGS', gameState.settings)
  })

  socket.on('UPDATE_SERVER_SETTINGS', function(settings) {
    gameState.updateSettings(settings)
    io.emit('MESSAGE', { message: 'Game settings updated' })
  })

  socket.on('LOBBY', function() {
    clearTimeout(timeout)
    gameState.reset()
    players.clearReady()
  })
})