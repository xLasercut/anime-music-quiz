{ emojiList } = require '../../shared-classes.coffee'

class EmojiConverter
  constructor: (logObject) ->
    @logObject = logObject

  addEmoji: (message) ->
    output = message
    emojis = emojiList.read()
    for key, emojiObj of emojis
      emoji = ":#{key}:"
      if output.includes(emoji)
        if emojiObj.type == "img"
          output = output.split(emoji).join("<img src=\"#{emojiObj.src}\" class=\"emoji\" />")
        else if emojiObj.type == "dec"
          output = output.split(emoji).join(emojiObj.src)
    return output


module.exports = EmojiConverter