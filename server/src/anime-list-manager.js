const fs = require('fs')

class AnimeListManager {
  constructor() {
    this.completeList = []
    this.choices = []
    this.userList = []
    this.initialiseList()
    this.currentAnime = {}
    this.gameList = []
  }

  initialiseList() {
    this.completeList = JSON.parse(fs.readFileSync('./anime.json', { encoding: 'utf-8' }))
    this.choices = JSON.parse(fs.readFileSync('./choices.json', { encoding: 'utf-8' }))
    this.userList = JSON.parse(fs.readFileSync('./user-list.json', { encoding: 'utf-8' }))
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

  updateUserList(list) {
    this.userList = list
    fs.renameSync('./user-list.json', './user-list-back.json')
    fs.writeFileSync('./user-list.json', JSON.stringify(list, null, 2))
  }

}

module.exports = new AnimeListManager()