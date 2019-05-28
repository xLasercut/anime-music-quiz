class Players {
  constructor(io) {
    this.io = io
    this.list = {}
  }

  updateClient() {
    this.io.emit('UPDATE_PLAYERS', this.list)
  }

  addPlayer(player, id) {
    var host = false
    if (Object.keys(this.list).length === 0) {
      host = true
    }
    this.list[id] = {
      score: player.score || 0,
      username: player.username,
      ready: false,
      avatar: player.avatar,
      guess: '',
      host: host
    }
    this.updateClient()
  }

  removePlayer(id) {
    this.moveHost(id)
    delete this.list[id]
    this.updateClient()
  }

  moveHost(id) {
    if (this.list[id].host) {
      for (var key in this.list) {
        if (key !== id) {
          this.list[key].host = true
          break
        }
      }
    }
  }

  addPoint(id) {
    this.list[id]['score'] += 1
  }

  resetScore() {
    for (var key in this.list) {
      this.list[key]['score'] = 0
    }
    this.updateClient()
  }

  ready(id) {
    this.list[id]['ready'] = true
  }

  clearReady() {
    for (var key in this.list) {
      this.list[key]['ready'] = false
    }
    this.updateClient()
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

  username(id) {
    return this.list[id].username
  }
}

module.exports = Players