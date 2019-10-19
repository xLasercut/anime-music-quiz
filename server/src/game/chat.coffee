ChatBot =  require './chat/chat-bot.coffee'
sanitizer = require './chat/sanitizer.coffee'
EmojiConverter = require './chat/emoji-converter.coffee'

class Chat
  constructor: (io, logger, db) ->
    this.logger = logger
    this.io = io
    this.bot = new ChatBot(io, db)
    this.converter = new EmojiConverter(logger, db)

  userMsg: (player, socket, message) ->
    sanitizedMsg = sanitizer(message)
    this.sendMsg(player.username, this.converter.addEmoji(sanitizedMsg), player.avatar, socket.admin, socket.id)
    botResponse = this.bot.respond(sanitizedMsg)
    if botResponse
      botMsg = ":notes: #{sanitizer(botResponse.text)} :notes:"
      this.sendMsg(botResponse.user, this.converter.addEmoji(botMsg), botResponse.avatar, false, botResponse.id)
    this.logger.writeLog('CHAT001', { username: player.username, message: sanitizedMsg })

  systemMsg: (message) ->
    sanitizedMsg = sanitizer(message)
    this.sendMsg('Eva Unit-01', this.converter.addEmoji(sanitizedMsg), 'eva_unit_1', false, 'eva_bot')

  sendMsg: (user, text, avatar, admin, id) ->
    data = {
      user: user,
      message: text,
      admin: admin,
      avatar: avatar,
      id: id
    }
    this.io.emit('MESSAGE', data)

module.exports = Chat