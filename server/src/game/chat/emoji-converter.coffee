{ emojiList } = require '../../shared-classes.coffee'

class EmojiConverter
  constructor: (logObject) ->
    @logObject = logObject

  addEmoji: (message) ->
    output = message
    emojis = emojiList.read()
    for item in emojis
      emoji = new RegExp(":#{item.command}:", 'gi')
      if item.type == "img"
        output = output.replace(emoji, "<img src=\"#{item.src}\" class=\"emoji\" />")
      else if item.type == "dec"
        output = output.replace(emoji, item.src)
    return output


module.exports = EmojiConverter