const database = require('../database/database.js')

class AnimeListManager {
  constructor() {
    this.completeList = []
    this.choices = []
    this.userListFiles = []
    this.initialiseList()
    this.gameList = []
  }

  initialiseList() {
    this.completeList = database.getFullAnimeList()
    this.choices = database.getUserChoices()
    this.userListFiles = database.getUserListFiles()
  }

  generateGameList(settings) {
    var songNumber = settings.songNumber
    var userList = database.getCombinedList(settings.lists)
    this.gameList = []
    var dupe = []

    while (this.gameList.length < songNumber && userList.length > 0) {
      var index = Math.floor(Math.random() * userList.length)
      var name = userList[index].name
      if (!dupe.includes(name)) {
        this.gameList.push(userList[index])
        dupe.push(name)
      }
      userList.splice(index, 1)
    }

    return this.gameList
  }

  getUserList(filename) {
    return database.getUserList(filename)
  }

  updateUserList(filename, list) {
    database.writeUserList(filename, list)
  }

}

module.exports = new AnimeListManager()