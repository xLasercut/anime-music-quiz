{ chatBotList } = require '../shared-classes.coffee'

class ChatBot
  constructor: (io) ->
    @io = io


  respond: (message) ->
    for item in chatBotList.read()
      pattern = new RegExp(item.regex, item.flag)
      if message.match(pattern)
        return item.response
    return null


module.exports = ChatBot