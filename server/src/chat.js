class Chat {
  constructor(io, logger) {
    this.io = io
    this.logger = logger
  }

  userMsg(message, username) {
    this.logger.debug(`user msg - ${username}=${message}`)
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