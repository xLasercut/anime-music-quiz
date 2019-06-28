{ emojiList } = require '../../shared-classes.coffee'

class EmojiConverter
  constructor: (logObject) ->
    @logObject = logObject

  addEmoji: (message) ->
    output = message
    emojis = emojiList.read()
    for key, emojiObj of emojis
      emoji = new RegExp(":#{key}:", 'gi')
      if emojiObj.type == "img"
        output = output.replace(emoji, "<img src=\"#{emojiObj.src}\" class=\"emoji\" />")
      else if emojiObj.type == "dec"
        output = output.replace(emoji, emojiObj.src)
    return output


module.exports = EmojiConverter