const database = require('../database/database.js')

class AnimeListManager {
  constructor(logger) {
    this.completeList = []
    this.choices = []
    this.userListFiles = []
    this.initialiseList()
    this.logger = logger
  }

  initialiseList() {
    this.completeList = database.getFullAnimeList()
    this.choices = database.getUserChoices()
    this.userListFiles = database.getUserListFiles()
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

  getUserList(filename) {
    var list = database.getUserList(filename)
    this.logger.info(`fetched ${filename}`)
    return list
  }

  updateUserList(filename, list) {
    database.writeUserList(filename, list)
    this.logger.info(`updated ${filename}`)
  }

}

module.exports = AnimeListManager