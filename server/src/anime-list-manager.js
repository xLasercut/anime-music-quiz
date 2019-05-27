const fs = require('fs')

class AnimeListManager {
  constructor() {
    this.completeList = []
    this.choices = []
    this.userList = []
    this.initialiseList()
    this.currentAnime = {}

  }

  initialiseList() {
    this.completeList = JSON.parse(fs.readFileSync('./anime.json', { encoding: 'utf-8' }))
    this.choices = JSON.parse(fs.readFileSync('./choices.json', { encoding: 'utf-8' }))
    this.userList = JSON.parse(fs.readFileSync('./user-list.json', { encoding: 'utf-8' }))
  }

  getSong() {
    var index = Math.floor(Math.random() * this.completeList.length)
    return this.completeList[index]
  }

  updateUserList(list) {
    this.userList = list
    fs.renameSync('./user-list.json', './user-list-back.json')
    fs.writeFileSync('./user-list.json', JSON.stringify(list, null, 2))
  }

}

module.exports = new AnimeListManager()