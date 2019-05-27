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
    var index = Math.floor(Math.random() * this.userList.length)
    var song = this.userList[index]
    this.userList.splice(index, 1)
    return song
  }

  generateGameList(songNumber) {
    this.gameList = []
    var max = songNumber
    if (this.userList.length < songNumber) {
      max = this.userList.length
      console.log(this.userList.length)
    }
    var dupe = []

    for (var n = 0; n < max; n++) {
      var index = Math.floor(Math.random() * this.userList.length)
      if (!dupe.includes(index)) {
        dupe.push(index)
        this.gameList.push(this.userList[index])
      }
    }

    return max
  }

  updateUserList(list) {
    this.userList = list
    fs.renameSync('./user-list.json', './user-list-back.json')
    fs.writeFileSync('./user-list.json', JSON.stringify(list, null, 2))
  }

}

module.exports = new AnimeListManager()