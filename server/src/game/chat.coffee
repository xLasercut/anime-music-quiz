ChatBot =  require './chat-bot.coffee'

class Chat
  constructor: (io, logObject) ->
    @logObject = logObject
    @io = io
    @bot = new ChatBot(io)

  userMsg: (player, socket, message) ->
    @sendMsg(player.username, message, player.avatar, socket.admin, socket.id)
    botResponse = @bot.respond(message)
    if botResponse
      @sendMsg(botResponse.user, botResponse.text, botResponse.avatar, false, botResponse.id)
    @logObject.writeLog('CHAT001', { username: player.username, message: message })

  systemMsg: (message) ->
    @sendMsg('Eva Unit 1', message, 'eva_unit_1', true, 'eva_bot')

  sendMsg: (user, text, avatar, admin, id) ->
    data = {
      user: user,
      message: text,
      admin: admin,
      avatar: avatar,
      id: id
    }
    @io.emit('MESSAGE', data)

module.exports = Chat