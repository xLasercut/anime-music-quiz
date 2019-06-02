const Chat = require('./chat.js')

class Players {
  constructor(io, logger) {
    this.io = io
    this.list = {}
    this.logger = logger
    this.chat = new Chat(io, logger)
  }

  listener(socket) {
    socket.on('LOGIN', (player) => {
      this.addPlayer(player, socket.id)
      this.chat.systemMsg(`${player.username} has joined the room`)
    })

    socket.on('USER_MESSAGE', (message) => {
      this.chat.userMsg(message, this.username(socket.id))
    })
  }

  updateClient() {
    this.logger.debug('sent update players signal to client')
    this.io.emit('SYNC_PLAYERS', this.list)
  }

  addPlayer(player, id) {
    var host = false
    if (Object.keys(this.list).length === 0) {
      host = true
    }
    this.list[id] = {
      score: player.score || 0,
      username: player.username,
      ready: false,
      avatar: player.avatar,
      guess: {
        anime: '',
        song: ''
      },
      host: host
    }
    this.logger.info(`added player - ${JSON.stringify(this.list[id])}`)
    this.updateClient()
  }

  removePlayer(id) {
    this.moveHost(id)
    delete this.list[id]
    this.logger.info(`removed player id - ${id}`)
    this.updateClient()
  }

  moveHost(id) {
    if (this.list[id].host) {
      for (var key in this.list) {
        if (key !== id) {
          this.list[key].host = true
          this.logger.info(`moved host to - ${JSON.stringify(this.list[key])}`)
          break
        }
      }
    }
  }

  addPoint(id, point) {
    this.list[id]['score'] += point
  }

  resetScore() {
    for (var key in this.list) {
      this.list[key]['score'] = 0
    }
    this.logger.debug('reset all player scores')
    this.updateClient()
  }

  ready(id) {
    this.list[id]['ready'] = true
    this.logger.debug(`player ${this.list[id].username} ready`)
  }

  clearReady() {
    for (var key in this.list) {
      this.list[key]['ready'] = false
    }
    this.updateClient()
  }

  setGuess(id, guess) {
    this.list[id]['guess'] = guess
  }

  allReady() {
    var ready = true
    for (var key in this.list) {
      if (!this.list[key]['ready']) {
        ready = false
      }
    }

    return ready
  }

  username(id) {
    return this.list[id].username
  }
}

module.exports = Players