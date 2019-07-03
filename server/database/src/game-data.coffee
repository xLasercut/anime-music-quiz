path = require 'path'

AbstractDatabase = require './abstract.coffee'

{ baseDir } = require './constants.coffee'

class ChatBotList extends AbstractDatabase
  constructor: () ->
    super(path.join(baseDir, 'chat-bot.json'))

class EmojiList extends AbstractDatabase
  constructor: () ->
    super(path.join(baseDir, 'emoji.json'))

  add: (emoji) ->
    for item in @db
      if emoji.command.toLowerCase() == item.command.toLowerCase()
        return false
    @db.push(emoji)
    return true

  remove: (emoji) ->
    for i in [0..@db.length - 1]
      if @db[i].command == emoji.command
        @db.splice(i, 1)
        break

module.exports = { ChatBotList, EmojiList }