class PlayerManager {
  constructor() {
    this.players = {}
  }

  addPlayer(username, id) {
    if (!(id in this.players)) {
      this.players[id] = {
        score: 0,
        username: '',
        loaded: false
      }
    }
    this.players[id]['username'] = username
  }

  removePlayer(id) {
    delete this.players[id]
  }

  addPoint(id) {
    this.players[id]['score'] += 1
  }

  resetScore() {
    for (var key in this.players) {
      this.players[key]['score'] = 0
    }
  }

  setPlayerLoadStatus(id, status) {
    this.players[id]['loaded'] = status
  }

  allPlayerReady() {
    var ready = true
    for (var key in this.players) {
      if (!this.players[key]['loaded']) {
        ready = false
      }
    }

    return ready
  }
}

module.exports = new PlayerManager()