class Chat
  constructor: (io) ->
    @io = io

  user: (message, username) ->
    data = {
      user: username,
      message: message
    }
    @message(data)

  system: (message) ->
    @message({ message: message })

  message: (msgData) ->
    @io.emit('MESSAGE', msgData)

module.exports = Chat