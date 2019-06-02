const Chat = require('./chat.js')

class GameState {
  constructor(io, logger) {
    this.io = io
    this.logger = logger
    this.chat = new Chat(io, logger)
    this.playing = false
    this.settings = {
      songNumber: 20,
      guessTime: 25,
      type: ['opening', 'ending'],
      lists: []
    }
    this.currentSong = {}
    this.currentSongNumber = 0
    this.maxSongNumber = 20
    this.gameList = []
    this.startPosition = 0
    this.timeout = null
  }

  listener(socket, players, settings, animeListManager) {
    socket.on('disconnect', () => {
      this.logger.info(`disconnected - ${socket.id}`)
      if (socket.id in players.list) {
        this.chat.systemMsg(`${players.list[socket.id]['username']} has left the room`)
        players.removePlayer(socket.id)
        if (Object.keys(players.list).length < 1) {
          this.logger.info('zero players connected. server status reset')
          this.reset()
        }
      }
    })

    socket.on('START_GAME', () => {
      this.logger.info('start new round')
      this.gameList = animeListManager.generateGameList(settings.songNumber, settings.lists)
      if (this.gameList.length > 0) {
        this.startGame()
        players.resetScore()
        this.newSong()
      }
      else {
        this.chat.systemMsg('Empty song list')
      }
    })

    socket.on('SONG_LOADED', () => {
      players.ready(socket.id)
      if (players.allReady()) {
        this.io.emit('START_COUNTDOWN')
        players.clearReady()
        var d = new Date()
        this.logger.debug(`countdown started at ${d.getTime()}`)
        this.timeout = setTimeout(() => {
          var d = new Date()
          this.logger.debug(`countdown finished at ${d.getTime()}`)
          this.io.emit('TIME_UP')
        }, settings.guessTime * 1000)
      }
    })

    socket.on('GUESS', (guess) => {
      players.setGuess(socket.id, guess)
      players.ready(socket.id)
      var point = this.calculatePoints(guess)
      players.addPoint(socket.id, point)
      if (players.allReady()) {
        players.clearReady()
        this.io.emit('SHOW_GUESS')
        if (this.roundEnd()) {
          this.logger.info('round ended')
          this.reset()
        }
        else {
          this.timeout = setTimeout(() => {
            this.newSong()
          }, 10000)
        }
      }
    })

    socket.on('STOP_GAME', () => {
      this.reset()
      players.clearReady()
    })

    socket.on('SYNC_PLAYING', () => {
      socket.emit('SYNC_PLAYING', this.playing)
    })

    socket.on('SYNC_CURRENT_SONG', (_data, callback) => {
      callback(this.currentSong)
    })

    socket.on('SYNC_START_POSITION', (_data, callback) => {
      callback(this.startPosition)
    })

    socket.on('SYNC_SONG_NUMBER', (_data, callback) => {
      callback({ current: this.currentSongNumber, max: this.maxSongNumber })
    })
  }

  startGame() {
    this.playing = true
    this.io.emit('SYNC_PLAYING', this.playing)
    this.maxSongNumber = this.gameList.length
    this.logger.info(`setting game status - playing=${this.playing} song number=${this.maxSongNumber}`)
  }

  updateSettings(settings) {
    this.settings = settings
    this.logger.info(`game setting updated - ${JSON.stringify(this.settings)}`)
  }

  calculatePoints(guess) {
    var point = 0
    if (guess.anime === this.currentSong.name || this.currentSong.altName.includes(guess.anime)) {
      point += 1
    }

    if (guess.song) {
      if (guess.song.toLowerCase() === this.currentSong.title.toLowerCase()) {
        point += 1
      }
    }

    return point
  }

  roundEnd() {
    if (this.currentSongNumber < this.maxSongNumber) {
      return false
    }
    return true
  }

  reset() {
    clearTimeout(this.timeout)
    this.currentSong = {}
    this.currentSongNumber = 0
    this.playing = false
    this.io.emit('SYNC_PLAYING', this.playing)
    this.io.emit('RESET')
    this.logger.info('reset server status')
  }

  genRandomSong() {
    var index = Math.floor(Math.random() * this.gameList.length)
    var song = this.gameList[index]
    this.gameList.splice(index, 1)
    return song
  }

  newSong() {
    this.currentSong = this.genRandomSong()
    this.currentSongNumber += 1
    this.logger.info(`new song - number=${this.currentSongNumber} name=${this.currentSong.title} anime=${this.currentSong.name}`)
    this.startPosition = Math.random()
    this.io.emit('NEW_SONG')
  }
}


module.exports = GameState