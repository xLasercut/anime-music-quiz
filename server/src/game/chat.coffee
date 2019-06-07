class Chat
  constructor: (io, logObject) ->
    @logObject = logObject
    @io = io

  user: (message, username, admin) ->
    data = {
      user: username,
      message: message,
      admin: admin
    }
    @message(data)
    @logObject.writeLog('CHAT001', { username: username, message: message })

  system: (message) ->
    @message({ message: message })

  message: (msgData) ->
    @io.emit('MESSAGE', msgData)

module.exports = Chat