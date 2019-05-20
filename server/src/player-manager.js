class PlayerManager {
  constructor() {
    this.players = {}
  }

  addPlayer(username, id) {
    this.players[id] = username
  }

  removePlayer(id) {
    delete this.players[id]
  }
}

module.exports = new PlayerManager()