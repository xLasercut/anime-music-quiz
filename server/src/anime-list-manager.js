const axios = require('axios')

class AnimeListManager {
  constructor() {
    this.completeList = []
    this.titleList = []
    this.initialiseList()
  }

  initialiseList() {
    axios.get('https://openings.moe/api/list.php')
    .then((response) => {
      this.completeList = response.data
      this.initialiseTitleList()
      console.log('Anime list loaded')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  initialiseTitleList() {
    var addedTitles = []

    for (var anime of this.completeList) {
      if (!addedTitles.includes(anime.source)) {
        addedTitles.push(anime.source)
        this.titleList.push({
          value: anime.source
        })
      }
    }
    console.log(this.titleList)
  }
}

module.exports = new AnimeListManager()