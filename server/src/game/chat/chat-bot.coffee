class ChatBot
  constructor: (io, db) ->
    this.io = io
    this.db = db


  respond: (message) ->
    for item in this.db.botList
      pattern = new RegExp(item.regex, item.flag)
      if message.match(pattern)
        return item.response
    return null


module.exports = ChatBot