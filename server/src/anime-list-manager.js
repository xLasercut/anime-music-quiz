const database = require('../database/database.js')

class AnimeListManager {
  constructor(logger) {
    this.completeList = []
    this.choices = []
    this.userListFiles = []
    this.logger = logger
    this.userLists = {}
    this.initialiseList()
  }

  initialiseList() {
    this.completeList = database.getFullAnimeList()
    this.choices = database.getUserChoices()
    this.userListFiles = database.getUserListFiles()
    for (var filename of this.userListFiles) {
      this.userLists[filename] = this.getUserListDisk(filename)
    }
  }

  generateGameList(settings) {
    var songNumber = settings.songNumber
    var userList = database.getCombinedList(settings.lists)
    var gameList = []
    var dupe = []

    while (gameList.length < songNumber && userList.length > 0) {
      var index = Math.floor(Math.random() * userList.length)
      var name = userList[index].name
      if (!dupe.includes(name)) {
        gameList.push(userList[index])
        dupe.push(name)
      }
      userList.splice(index, 1)
    }
    this.logger.info(`generated game list - size=${gameList.length}`)
    return gameList
  }

  getUserListDisk(filename) {
    var list = database.getUserList(filename)
    this.logger.info(`fetched ${filename}`)
    return list
  }

  getUserList(filename) {
    if (filename in this.userLists) {
      return this.userLists[filename]
    }
    return []
  }

  updateUserList(filename, list) {
    this.userLists[filename] = list
    database.writeUserList(filename, list)
    this.logger.info(`updated ${filename}`)
  }

}

module.exports = AnimeListManager