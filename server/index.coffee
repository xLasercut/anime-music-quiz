express = require 'express'
socketio = require 'socket.io'
logger = require './src/logger.coffee'
GameListener = require './src/game/listener.coffee'
ListListener = require './src/list/listener.coffee'

app = express()
server = app.listen 3001, () ->
  logger.info('server running on port 3001')

io = socketio(server)

gameListener = new GameListener(io, logger)
listListener = new ListListener(io, logger)

io.on 'connection', (socket) ->
  logger.info("new connection - #{socket.id}")

  gameListener.listen(socket)
  listListener.listen(socket)