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

  getPlayersList() {
    return this.players
  }
}

module.exports = new PlayerManager()