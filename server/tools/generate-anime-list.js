const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const regex = new RegExp('^(OP|ED)')

const specialYears = ['90s', '80s', '70s', '60s']

var queued = []

var animes = []

for (var year = 2000; year <= 2019; year++) {
  queued.push(axios.get(`https://www.reddit.com/r/AnimeThemes/wiki/${year}`))
}

for (var year of specialYears) {
  queued.push(axios.get(`https://www.reddit.com/r/AnimeThemes/wiki/${year}`))
}

function getSongDetails(cell) {
  var songArray = cell.text().split('"')
  var type = ''
  var artist = ''
  var title = ''

  if (songArray[0]) {
    type = songArray[0].trim().replace('OP', 'Opening').replace('ED', 'Ending')
  }

  if (songArray[1]) {
    title = songArray[1].trim()
  }

  if (songArray[2]) {
    artist = songArray[2].trim().replace('by ', '')
  }

  return {
    title: title,
    artist: artist,
    type: type
  }
}

function isDuplicate(anime) {
  for (var item of animes) {
    if ((anime.src === item.src || anime.title === item.title) && anime.name === item.name) {
      return true
    }
  }
  return false
}

/* Get animes from animethemes wiki */
axios.all(queued)
.then((responses) => {
  for (var response of responses) {
    const $ = cheerio.load(response.data)
    var titles = $('h3 a')

    titles.each(function(_i, title) {
      var name = $(title).text()
      var table = $(`h3 a:contains('${name}')`).parent().nextUntil('table').next().html()
      var rows = $(table).find('tr')
      rows.each(function(_i, row) {
        var cells = $(row).find('td')
        cells.each(function(_i, cell) {
          if (regex.exec($(cell).text())) {
            var src = $(cell).next().find('a').attr('href')
            var song = getSongDetails($(cell))

            var anime = {
              name: name,
              src: src,
              title: song.title,
              artist: song.artist,
              type: song.type
            }

            if (!isDuplicate(anime)) {
              animes.push(anime)
            }
          }
        })
      })
    })
  }
  return axios.get('https://openings.moe/api/list.php')
})
//Get animes from openings.moe
.then((response) => {
  var data = response.data
  for (var anime of data) {
    var title = ''
    var artist = ''
    var type = anime.title

    if (anime.song) {
      title = anime.song.title
      artist = anime.song.artist
    }

    var anime = {
      src: `https://openings.moe/video/${anime.file}.mp4`,
      name: anime.source,
      title: title,
      artist: artist,
      type: type
    }

    if (!isDuplicate(anime)) {
      animes.push(anime)
    }
  }
  fs.writeFileSync('./anime.json', JSON.stringify(animes, null, 2))
})
.catch((error) => {
  console.log(error)
})
