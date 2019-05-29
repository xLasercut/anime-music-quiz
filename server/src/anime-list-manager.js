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

  getSong() {
    var index = Math.floor(Math.random() * this.gameList.length)
    var song = this.gameList[index]
    this.gameList.splice(index, 1)
    return song
  }

  generateGameList(songNumber) {
    this.gameList = []
    var userList = JSON.parse(fs.readFileSync('./user-list.json', { encoding: 'utf-8' }))
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

    return this.gameList.length
  }

  getUserList(filename) {
    return database.getUserList(filename)
  }

  updateUserList(filename, list) {
    database.writeUserList(filename, list)
  }

}

module.exports = new AnimeListManager()