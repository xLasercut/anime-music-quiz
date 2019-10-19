
class EmojiConverter
  constructor: (logger, db) ->
    this.logger = logger
    this.db = db

  addEmoji: (message) ->
    output = message
    emojis = this.db.emojiList
    for item in emojis
      emoji = new RegExp(":#{item.command}:", 'gi')
      if item.type == "img"
        output = output.replace(emoji, "<img src=\"#{item.src}\" class=\"emoji\" />")
      else if item.type == "dec"
        output = output.replace(emoji, item.src)
    return output


module.exports = EmojiConverter