{ UserLists, AnimeChoices, SongChoices, FullList,
  SongStats, ChatBotList, EmojiList } = require '../database/database.coffee'

userLists = new UserLists()
animeChoices = new AnimeChoices()
songChoices = new SongChoices()
fullList = new FullList()
songStats = new SongStats()
chatBotList = new ChatBotList()
emojiList = new EmojiList()

module.exports = { userLists, animeChoices, songChoices, fullList, songStats, chatBotList, emojiList }