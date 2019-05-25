const axios = require('axios')
const fs = require('fs')

class AnimeListManager {
  constructor() {
    this.completeList = []
    this.choices = []
    this.initialiseList()
    this.currentAnime = {}
  }

  initialiseList() {
    this.completeList = JSON.parse(fs.readFileSync('./anime.json', { encoding: 'utf-8' }))
    this.choices = JSON.parse(fs.readFileSync('./choices.json', { encoding: 'utf-8' }))
  }

  getSong() {
    var index = Math.floor(Math.random() * this.completeList.length)
    return this.completeList[index]
  }


}

module.exports = new AnimeListManager()