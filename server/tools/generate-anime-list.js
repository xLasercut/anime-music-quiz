const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const regex = new RegExp('^(OP|ED)')

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

var animes = []

/* Get animes from animethemes wiki */
axios.get('https://www.reddit.com/r/AnimeThemes/wiki/year_index')
.then((response) => {
  const $ = cheerio.load(response.data)
  var queued = []
  var links = $('p a')
  links.each(function(_i, link) {
    var href = $(link).attr('href')
    if (href.includes('/r/AnimeThemes/wiki/')) {
      var url = `https://www.reddit.com${href}`
      queued.push(axios.get(url))
    }
  })
  return axios.all(queued)
})
.then((responses) => {
  for (var response of responses) {
    const $ = cheerio.load(response.data)
    var titles = $('h3 a')

    titles.each(function(_i, title) {
      var name = $(title).text()
      var table = $(`h3 a:contains('${name}')`).parent().next().html()
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
              song: song
            }

            animes.push(anime)
          }
        })
      })
    })
  }
  return axios.get('https://openings.moe/api/list.php')
})
/* Get animes from openings.moe */
.then((response) => {
  var data = response.data
  for (var anime of data) {
    var song = {
      title: '',
      artist: '',
      type: anime.title
    }

    if (anime.song) {
      song.title = anime.song.title
      song.artis = anime.song.artist
    }

    animes.push({
      src: `https://openings.moe/video/${anime.file}.mp4`,
      name: anime.source,
      song: song
    })
  }
  fs.writeFileSync('./anime.json', JSON.stringify(animes, null, 2))
})
.catch((error) => {
  console.log(error)
})