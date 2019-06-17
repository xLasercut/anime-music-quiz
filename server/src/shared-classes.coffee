{ UserLists, AnimeChoices, SongChoices, FullList, SongStats, ChatBotList } = require '../database/database.coffee'

userLists = new UserLists()
animeChoices = new AnimeChoices()
songChoices = new SongChoices()
fullList = new FullList()
songStats = new SongStats()
chatBotList = new ChatBotList()

module.exports = { userLists, animeChoices, songChoices, fullList, songStats, chatBotList }