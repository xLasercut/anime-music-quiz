const axios = require('axios')
const cheerio = require('cheerio')
const file = require('./shared/file.js')
const conversionMap = require('./generate-anime-list/conversion-map.js')
const queries = require('./generate-anime-list/query-generator.js')

const titleFilter = new RegExp('^(OP|ED)')
var animes = []

function getTable(title) {
  var next = title.parent().next()
  if (next[0].name === 'table') {
    return next.html()
  }
  else if (next[0].name === 'p') {
    return title.parent().nextUntil('table').next().html()
  }
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

function convertName(name) {
  for (var key in conversionMap) {
    if (conversionMap[key].includes(name)) {
      return key
    }
  }
  return name
}

function isDuplicate(anime) {
  for (var item of animes) {
    if ((anime.src === item.src || anime.title === item.title) && anime.name === item.name) {
      return true
    }
  }
  return false
}

function addToList(rawName, cell) {
  if (titleFilter.exec(cell.text())) {
    var src = cell.next().find('a').attr('href')
    if (src) {
      var song = getSongDetails(cell)
      var name = convertName(rawName)

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
  }
}



// Get animes from animethemes wiki
axios.all(queries)
.then((responses) => {
  for (var response of responses) {
    const $ = cheerio.load(response.data)
    var titles = $('h3 a')

    titles.each(function(_i, title) {
      var name = $(title).text()
      var table = getTable($(title))
      var rows = $(table).find('tr')

      rows.each(function(_i, row) {
        var cells = $(row).find('td')

        cells.each(function(_i, cell) {
           addToList(name, $(cell))
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
  file.write('./anime.json', animes)
})
.catch((error) => {
  console.log(error)
})