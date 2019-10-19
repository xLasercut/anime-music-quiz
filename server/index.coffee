express = require 'express'
socketio = require 'socket.io'
Logger = require './src/logging/logging.coffee'
AMQDatabase = require './database/database.coffee'
ListManager = require './src/list/index.coffee'
GameManager = require './src/game/index.coffee'
MiscManager = require './src/misc/index.coffee'
AdminManager = require './src/admin/index.coffee'
config = require './src/config.coffee'

app = express()
logger = new Logger()

server = app.listen config.serverPort, () ->
  logger.writeLog('SERVER001', { port: config.serverPort })

io = socketio(server)

db = new AMQDatabase()
listManager = new ListManager(io, logger, db)
gameManager = new GameManager(io, logger, db)
miscManager = new MiscManager(io, logger, db)
adminManager = new AdminManager(io, logger, gameManager, listManager, db)

checkPassword = (socket, password) ->
  if password == config.adminPassword or password == config.serverPassword
    socket.auth = true
  if password == config.adminPassword
    socket.admin = true

startListeners = (socket, callback) ->
  if socket.auth
    logger.writeLog('AUTH001', { id: socket.id, admin: socket.admin })
    socket.emit('SYNC_ADMIN', socket.admin)
    listManager.startListeners(socket)
    gameManager.startListeners(socket)
    miscManager.startListeners(socket)
    if socket.admin
      adminManager.startListeners(socket)
  callback(socket.auth, socket.admin)

io.on 'connection', (socket) ->
  logger.writeLog('SERVER002', { id: socket.id })
  socket.auth = false
  socket.admin = false

  socket.on 'AUTHENTICATE', (password, callback) =>
    checkPassword(socket, password)
    startListeners(socket, callback)

  setTimeout( () =>
    if !socket.auth
      logger.writeLog('AUTH002', { id: socket.id })
      socket.disconnect('unauthorized')
  , 1000)

  socket.on 'disconnect', () =>
    logger.writeLog('SERVER003', { id: socket.id })
