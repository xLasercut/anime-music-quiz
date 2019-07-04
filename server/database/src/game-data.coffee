path = require 'path'

AbstractDatabase = require './abstract.coffee'

{ baseDir } = require './constants.coffee'

class ChatBotList extends AbstractDatabase
  constructor: () ->
    super(path.join(baseDir, 'chat-bot.json'))

class EmojiList extends AbstractDatabase
  constructor: () ->
    super(path.join(baseDir, 'emoji.json'))

  _isValid: (emoji) ->
    mandatoryFields = ['command', 'src', 'type']
    for field in mandatoryFields
      if !emoji[field]
        return false
    return true

  _isDuplicate: (emoji) ->
    for item in @db
      if emoji.command.toLowerCase() == item.command.toLowerCase()
        return true
    return false

  add: (emoji) ->
    if @_isValid(emoji) and !@_isDuplicate(emoji)
      @db.push(emoji)
      @write()

  remove: (emoji) ->
    if @_isValid(emoji)
      for item, i in @db
        if item.command.toLowerCase() == emoji.command.toLowerCase()
          @db.splice(i, 1)
          break
      @write()

module.exports = { ChatBotList, EmojiList }