ChatBot =  require './chat/chat-bot.coffee'
sanitizer = require './chat/sanitizer.coffee'
EmojiConverter = require './chat/emoji-converter.coffee'

class Chat
  constructor: (io, logObject) ->
    @logObject = logObject
    @io = io
    @bot = new ChatBot(io)
    @converter = new EmojiConverter(logObject)

  userMsg: (player, socket, message) ->
    sanitizedMsg = sanitizer(message)
    @sendMsg(player.username, @converter.addEmoji(sanitizedMsg), player.avatar, socket.admin, socket.id)
    botResponse = @bot.respond(sanitizedMsg)
    if botResponse
      botMsg = sanitizer(botResponse.text)
      @sendMsg(botResponse.user, botMsg, botResponse.avatar, false, botResponse.id)
    @logObject.writeLog('CHAT001', { username: player.username, message: sanitizedMsg })

  systemMsg: (message) ->
    sanitizedMsg = sanitizer(message)
    @sendMsg('Eva Unit-01', @converter.addEmoji(sanitizedMsg), 'eva_unit_1', false, 'eva_bot')

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