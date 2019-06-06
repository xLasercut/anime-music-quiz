{ UserLists, AnimeChoices, SongChoices, FullList } = require '../database/database.coffee'

userLists = new UserLists()
animeChoices = new AnimeChoices()
songChoices = new SongChoices()
fullList = new FullList()

module.exports = { userLists, animeChoices, songChoices, fullList }