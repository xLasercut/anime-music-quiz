express = require 'express'
socketio = require 'socket.io'
LogObject = require './src/logging/log-object.coffee'
GameListener = require './src/game/listener.coffee'
ListListener = require './src/list/listener.coffee'
AdminListener = require './src/admin/listener.coffee'
config = require './src/config.coffee'

app = express()
logObject = new LogObject()

port = 3001
server = app.listen port, () ->
  logObject.writeLog('SERVER001', { port: port })

io = socketio(server)

gameListener = new GameListener(io, logObject)
listListener = new ListListener(io, logObject)
adminListener = new AdminListener(io, logObject)

checkPassword = (socket, password) ->
  if password == config.adminPassword or password == config.serverPassword
    socket.auth = true
  if password == config.adminPassword
    socket.admin = true

startListeners = (socket, callback) ->
  if socket.auth
    logObject.writeLog('AUTH001', { id: socket.id, admin: socket.admin })
    gameListener.listen(socket)
    listListener.listen(socket)
    if socket.admin
      adminListener.listen(socket)
    callback(true)
  else
    callback(false)

io.on 'connection', (socket) ->
  logObject.writeLog('SERVER002', { id: socket.id })
  socket.auth = false
  socket.admin = false

  socket.on 'AUTHENTICATE', (password, callback) =>
    checkPassword(socket, password)
    startListeners(socket, callback)

  setTimeout( () =>
    if !socket.auth
      logObject.writeLog('AUTH002', { id: socket.id })
      socket.disconnect('unauthorized')
  , 1000)

  socket.on 'disconnect', () =>
    logObject.writeLog('SERVER003', { id: socket.id })