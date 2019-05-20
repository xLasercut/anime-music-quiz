class PlayerManager {
  constructor() {
    this.players = {}
  }

  addPlayer(username, id) {
    if (!(id in this.players)) {
      this.players[id] = {
        score: 0,
        username: ''
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
}

module.exports = new PlayerManager()