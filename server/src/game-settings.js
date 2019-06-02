const Chat = require('./chat.js')

class GameSettings {
  constructor (io, logger) {
    this.settings = {
      songNumber: 20,
      guessTime: 25,
      type: ['opening', 'ending'],
      lists: []
    }
    this.io = io
    this.logger = logger
    this.chat = new Chat(io, logger)
  }

  listener(socket) {
    socket.on('SYNC_SETTINGS', () => {
      socket.emit('SYNC_SETTINGS', this.settings)
    })

    socket.on('UPDATE_SETTINGS', (settings) => {
      this.settings = settings
      this.logger.info(`game setting updated - ${JSON.stringify(this.settings)}`)
      this.io.emit('SYNC_SETTINGS', this.settings)
      this.chat.systemMsg('Game settings updated')
    })
  }

  get songNumber () {
    return this.settings.songNumber
  }

  get guessTime() {
    return this.settings.guessTime
  }

  get lists() {
    return this.settings.lists
  }
}


module.exports = GameSettings
