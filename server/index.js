const express = require('express');
const app = express();

const server = app.listen(3001, function() {
  console.log('server running on port 3001')
})

const io = require('socket.io')(server)
var players = require('./src/players.js')
var animeListManager = require('./src/anime-list-manager.js')

io.on('connection', function(socket) {
  console.log(`New connection made: ${socket.id}`)
  socket.emit('REQUEST_PLAYER_DETAILS')

  socket.on('LOGIN', function(player) {
    players.addPlayer(player, socket.id)
    io.emit('MESSAGE', { message: `${player.username} has joined the room` })
    io.emit('UPDATE_PLAYERS', players.list)
    socket.emit('UPDATE_ANIME_LIST', animeListManager.titleList)
  })

  socket.on('disconnect', function () {
    io.emit('MESSAGE', { message: `${players.list[socket.id]['username']} has left the room` })
    players.removePlayer(socket.id)
    io.emit('UPDATE_PLAYERS', players.list)
    console.log(`Disconnected: ${socket.id}`)
  })

  socket.on('SEND_MESSAGE', function(data) {
    io.emit('MESSAGE', data)
  })

  socket.on('START_GAME', function(settings) {
    io.emit('NEW_SONG', animeListManager.getAnime())
  })

  socket.on('AUDIO_LOADED', () => {
    players.setPlayerLoadStatus(socket.id, true)
    if (players.allPlayerReady()) {
      io.emit('START_COUNTDOWN')
      players.setPlayerLoadStatus(socket.id, false)
      setTimeout(() => {
        io.emit('TIME_UP')
      }, 30000)
    }
  })

  socket.on('GUESS', function(guess) {
    players.setGuess(socket.id, guess)
    if (animeListManager.guessResult(guess)) {
      players.addPoint(socket.id)
    }
    io.emit('UPDATE_PLAYERS', players.list)
  })
})