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
    for (var anime of this.completeList) {
      if (!this.titleList.includes(anime.source)) {
        this.titleList.push(anime.source)
      }
    }
    console.log(this.titleList)
  }
}

module.exports = new AnimeListManager()