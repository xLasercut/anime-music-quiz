const express = require('express')
const app = express()
const GameSettings = require('./src/game-settings.js')
const GameState = require('./src/game-state.js')
const Players = require('./src/players.js')
const AnimeListManager = require('./src/anime-list-manager.js')
const logger = require('./src/logger.js')

const server = app.listen(3001, function() {
  logger.info('server running on port 3001')
})

const io = require('socket.io')(server)
var settings = new GameSettings(io, logger)
var players = new Players(io, logger)
var gameState = new GameState(io, logger)
var animeListManager = new AnimeListManager(io, logger)

io.on('connection', function(socket) {
  logger.info(`new connection made - ${socket.id}`)
  settings.listener(socket)
  animeListManager.listener(socket)
  gameState.listener(socket, players, settings, animeListManager)
  players.listener(socket)
})