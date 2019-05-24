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
    this.initialiseTitleList()
    /*axios.get('https://openings.moe/api/list.php')
    .then((response) => {
      this.completeList = response.data
      this.initialiseTitleList()
      console.log('Anime list loaded')
    })
    .catch((error) => {
      console.log(error)
    })*/
  }

  initialiseTitleList() {
    var addedTitles = []

    for (var anime of this.completeList) {
      if (!addedTitles.includes(anime.source)) {
        addedTitles.push(anime.source)
        this.choices.push({
          value: anime.source
        })
      }
    }
  }

  getSong() {
    var index = Math.floor(Math.random() * this.completeList.length)
    return this.completeList[index]
  }


}

module.exports = new AnimeListManager()