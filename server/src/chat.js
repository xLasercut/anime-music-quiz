class Chat {
  constructor(io) {
    this.io = io
  }

  userMsg(message, username) {
    var data = {
      user: username,
      message: message
    }
    this.sendMsg(data)
  }

  systemMsg(message) {
    var data = {
      message: message
    }
    this.sendMsg(data)
  }

  sendMsg(data) {
    this.io.emit('MESSAGE', data)
  }
}

module.exports = Chat