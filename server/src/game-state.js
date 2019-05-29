const { getVideoDurationInSeconds } = require('get-video-duration')

class GameState {
  constructor(io, logger) {
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
    this.io = io,
    this.gameList = []
    this.logger = logger
  }

  startGame(gameList) {
    this.playing = true
    this.io.emit('UPDATE_PLAYING', this.playing)
    this.maxSongNumber = gameList.length
    this.gameList = gameList
    this.logger.info(`setting game status - playing=${this.playing} song number=${this.maxSongNumber}`)
  }

  updateSettings(settings) {
    this.settings = settings
    this.logger.info(`game setting updated - ${JSON.stringify(this.settings)}`)
  }

  checkGuess(guess) {
    if (guess === this.currentSong.name) {
      return true
    }
    return false
  }

  songNumbers() {
    return {
      current: this.currentSongNumber,
      max: this.maxSongNumber
    }
  }

  roundEnd() {
    if (this.currentSongNumber < this.maxSongNumber) {
      return false
    }
    return true
  }

  reset() {
    this.currentSong = {}
    this.currentSongNumber = 0
    this.playing = false
    this.io.emit('UPDATE_PLAYING', this.playing)
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
    getVideoDurationInSeconds(this.currentSong.src)
    .then((duration) => {
      var position = this.generatePosition(duration)
      this.logger.debug(`generated starting time - ${position} of ${duration}`)
      this.io.emit('NEW_SONG', this.currentSong, position)
      this.io.emit('UPDATE_SONG_NUMBER', this.songNumbers())
    })
  }

  generatePosition(duration) {
    var position = 0
    var maxStart = Math.floor(duration - this.settings.guessTime)
    if (maxStart > 0) {
      position = Math.floor(Math.random() * maxStart)
    }
    return position
  }
}


module.exports = GameState