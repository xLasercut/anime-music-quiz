const axios = require('axios')
const cheerio = require('cheerio')
const database = require('../database/database.js')
const queries = require('./generate-anime-list/query-generator.js')

const titleFilter = new RegExp('^(OP|ED)')
var animes = []

function getTable(title) {
  var next = title.parent().next()
  if (next[0].name === 'table') {
    return next.html()
  }
  else if (next[0].name === 'p') {
    var elementLength = title.parent().nextUntil('table').length
    var table = title.parent()
    for (var i = 0; i <= elementLength; i++) {
      table = table.next()
    }
    return table.html()
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

function addToList(name, cell) {
  if (cell.text().match(titleFilter)) {
    var src = cell.next().find('a').attr('href')
    if (src) {
      var song = getSongDetails(cell)

      var anime = {
        name: name,
        src: src,
        title: song.title,
        artist: song.artist,
        type: song.type
      }

      animes.push(anime)
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
  database.writeRawAnimeList(animes)
})
.catch((error) => {
  console.log(error)
})