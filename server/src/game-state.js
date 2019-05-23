class GameState {
  constructor() {
    this.playing = false
    this.settings = {
      songNumber: 20,
      guessTime: 25
    }
    this.currentSong = ''
    this.currentSongNumber = 0
  }

  updateSettings(settings) {
    this.settings = settings
  }

  updateCurrentSong(song) {
    this.currentSong = song
  }


}


module.exports = new GameState()