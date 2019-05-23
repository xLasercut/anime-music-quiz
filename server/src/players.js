class Players {
  constructor() {
    this.list = {}
  }

  addPlayer(player, id) {
    this.list[id] = {
      score: 0,
      username: player.username,
      ready: false,
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

  ready(id) {
    this.list[id]['ready'] = true
  }

  clearReady() {
    for (var key in this.list) {
      this.list[key]['ready'] = false
    }
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
}

module.exports = new Players()