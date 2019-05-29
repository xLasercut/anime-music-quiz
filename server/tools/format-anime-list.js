const database = require('../database/database.js')
const converter = require('./shared/converter.js')

var raw = database.getRawAnimeList()
var animes = []

function cleanTitle(title) {
  if (title.includes('(')) {
    var titleArray = title.split('(')
    return titleArray[0].trim()
  }
  return title
}

function isDuplicate(anime) {
  for (var item of animes) {
    if ((anime.src === item.src || anime.title === item.title) && anime.name === item.name) {
      return true
    }
  }
  return false
}

for (var anime of raw) {
  anime.name = converter.mapName(anime.name)
  anime.title = cleanTitle(anime.title)


  if (!isDuplicate(anime)) {
    animes.push(anime)
  }
}

database.writeFullAnimeList(animes)