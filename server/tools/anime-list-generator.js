const axios = require('axios')
const fs = require('fs')

axios.get('https://openings.moe/api/list.php')
.then((response) => {
  var data = response.data
  var parsedData = []
  var badData = []
  for (var anime of data) {
    if (anime.song) {
      parsedData.push({
        src: `https://openings.moe/video/${anime.file}.mp4`,
        name: anime.source,
        song: {
          title: anime.song.title,
          artist: anime.song.artist,
          type: anime.title
        }
      })
    }
    else {
      badData.push(anime)
    }
  }
  fs.writeFileSync('./anime.json', JSON.stringify(parsedData, null, 2))
  fs.writeFileSync('./bad-anime.json', JSON.stringify(badData, null, 2))
})
.catch((error) => {
  console.log(error)
})