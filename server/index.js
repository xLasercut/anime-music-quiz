const express = require('express');
const app = express();

const server = app.listen(3001, function() {
  console.log('server running on port 3001')
})

const io = require('socket.io')(server)
var playerManager = require('./src/player-manager.js')

io.on('connection', function(socket) {
  console.log(socket.id)
  socket.on('disconnect', function () {
    var playersList = playerManager.getPlayersList()
    io.emit('MESSAGE', { message: `${playersList[socket.id]} has left the room` })
    playerManager.removePlayer(socket.id)
  })

  socket.on('LOGIN', function(user) {
    playerManager.addPlayer(user, socket.id)
    io.emit('MESSAGE', { message: `${user} has joined the room` })
    socket.emit('PLAYER_ID', socket.id)
  })

  socket.on('SEND_MESSAGE', function(data) {
    io.emit('MESSAGE', data)
  })
})