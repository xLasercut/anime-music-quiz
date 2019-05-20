const express = require('express');
const app = express();

const server = app.listen(3001, function() {
  console.log('server running on port 3001')
})

const io = require('socket.io')(server)
var playerManager = require('./src/player-manager.js')
var animeListManager = require('./src/anime-list-manager.js')

io.on('connection', function(socket) {
  console.log(`new connection made: ${socket.id}`)
  socket.emit('PLAYER_DETAILS')

  socket.on('disconnect', function () {
    var playersList = playerManager.players
    io.emit('MESSAGE', { message: `${playersList[socket.id]['username']} has left the room` })
    playerManager.removePlayer(socket.id)
    io.emit('UPDATE_PLAYERS_LIST', playerManager.players)
  })

  socket.on('LOGIN', function(user) {
    playerManager.addPlayer(user, socket.id)
    io.emit('MESSAGE', { message: `${user} has joined the room` })
    io.emit('UPDATE_PLAYERS_LIST', playerManager.players)
    socket.emit('UPDATE_ANIME_LIST', animeListManager.titleList)
  })

  socket.on('SEND_MESSAGE', function(data) {
    io.emit('MESSAGE', data)
  })

  socket.on('START_GAME', function(settings) {
    io.emit('PLAY_SONG', animeListManager.getAnime())
    setTimeout(() => {
      io.emit('COLLECT_RESULT')
    }, 30000)
  })

  socket.on('GUESS', function(guess) {
    if (animeListManager.guessResult(guess)) {
      playerManager.addPoint(socket.id)
    }
    io.emit('UPDATE_PLAYERS_LIST', playerManager.players)
  })

  socket.on('AUDIO_LOADED', () => {
    playerManager.setPlayerLoadStatus(socket.id, true)
    if (playerManager.allPlayerReady()) {
      io.emit('START_COUNTDOWN')
      playerManager.setPlayerLoadStatus(socket.id, false)
    }
  })
})