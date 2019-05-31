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

  calculatePoints(guess) {
    var point = 0
    if (guess.anime === this.currentSong.name || this.currentSong.altName.includes(guess.anime)) {
      point += 1
    }

    if (guess.song === this.currentSong.title) {
      point += 1
    }

    return point
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
    var start = Math.random()
    this.io.emit('NEW_SONG', this.currentSong, start, this.settings.guessTime)
    this.io.emit('UPDATE_SONG_NUMBER', this.songNumbers())
  }
}


module.exports = GameState