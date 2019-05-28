class GameState {
  constructor(io) {
    this.playing = false
    this.settings = {
      songNumber: 20,
      guessTime: 25,
      type: ['opening', 'ending']
    }
    this.currentSong = {}
    this.currentSongNumber = 0
    this.maxSongNumber = 20
    this.io = io
  }

  startGame(max) {
    this.playing = true
    this.io.emit('UPDATE_PLAYING', this.playing)
    this.maxSongNumber = max
  }

  updateSettings(settings) {
    this.settings = settings
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
  }

  newSong(song, duration) {
    var position = this.generatePosition(duration)
    this.currentSong = song
    this.currentSongNumber += 1
    this.io.emit('NEW_SONG', song, position)
    this.io.emit('UPDATE_SONG_NUMBER', this.songNumbers())
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