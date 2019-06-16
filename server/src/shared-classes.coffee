{ UserLists, AnimeChoices, SongChoices, FullList, SongStats } = require '../database/database.coffee'

userLists = new UserLists()
animeChoices = new AnimeChoices()
songChoices = new SongChoices()
fullList = new FullList()
songStats = new SongStats()

module.exports = { userLists, animeChoices, songChoices, fullList, songStats }