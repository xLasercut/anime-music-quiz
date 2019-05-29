const file = require('../shared/file.js')
const path = require('path')
const fs = require('fs')

const gameDataDir = path.join(__dirname, '..', 'database')
const userDataDir = path.join(__dirname, '..', 'database', 'user')

const ignore = ['.gitkeep', '.back']

class AnimeListManager {
  constructor() {
    this.completeList = []
    this.choices = []
    this.userList = []
    this.initialiseList()
    this.currentAnime = {}
    this.gameList = []
    this.userListChoice = []
  }

  initialiseList() {
    //this.completeList = JSON.parse(fs.readFileSync('./database/anime.json', { encoding: 'utf-8' }))
    //this.choices = JSON.parse(fs.readFileSync('./database/choices.json', { encoding: 'utf-8' }))
    //this.userList = JSON.parse(fs.readFileSync('./database/user-list.json', { encoding: 'utf-8' }))
    this.getUserListChoices()
  }

  getUserListChoices() {
    var choices = file.fileNames(userDataDir)
    for (var i = 0; i < choices.length; i++) {
      for (var item of ignore) {
        if (choices[i].includes(item)) {
          choices.splice(i, 1)
        }
      }
    }
    this.userListChoice = choices
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