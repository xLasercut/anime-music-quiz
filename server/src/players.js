class Players {
  constructor() {
    this.list = {}
  }

  addPlayer(player, id) {
    this.list[id] = {
      score: 0,
      username: player.username,
      loaded: false,
      avatar: player.avatar,
      guess: ''
    }
  }

  removePlayer(id) {
    delete this.list[id]
  }

  addPoint(id) {
    this.list[id]['score'] += 1
  }

  resetScore() {
    for (var key in this.list) {
      this.list[key]['score'] = 0
    }
  }

  setPlayerLoadStatus(id, status) {
    this.list[id]['loaded'] = status
  }

  setGuess(id, guess) {
    this.list[id]['guess'] = guess
  }

  allPlayerReady() {
    var ready = true
    for (var key in this.list) {
      if (!this.list[key]['loaded']) {
        ready = false
      }
    }

    return ready
  }
}

module.exports = new Players()