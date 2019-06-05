express = require 'express'
socketio = require 'socket.io'
logger = require './src/logger.coffee'
GameListener = require './src/game/listener.coffee'
ListListener = require './src/list/listener.coffee'
config = require './src/config.coffee'

app = express()
server = app.listen 3001, () ->
  logger.info('server running on port 3001')

io = socketio(server)

gameListener = new GameListener(io, logger)
listListener = new ListListener(io, logger)

io.on 'connection', (socket) ->
  logger.info("new connection - #{socket.id}")
  socket.auth = false

  socket.on 'AUTHENTICATE', (password) =>
    if password == config.serverPassword
      socket.auth = true
      logger.info("authenticated client - id=#{socket.id}")
      gameListener.listen(socket)
      listListener.listen(socket)

  setTimeout( () =>
    if !socket.auth
      logger.info("client unauthroized - id=#{socket.id}")
      socket.disconnect('unauthorized')
  , 1000)
