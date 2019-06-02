const database = require('../database/database.js')
const converter = require('./shared/converter.js')

var raw = database.rawAnimeList
var animes = []

function isDuplicate(anime) {
  for (var item of animes) {
    if ( (anime.title === item.title && anime.name === item.name) || anime.id === item.id) {
      return true
    }
  }
  return false
}

for (var anime of raw) {
  anime.name = converter.swapName(anime.name)
  anime.altName = converter.alternateName(anime.name)
  anime.title = converter.swapTitle(anime.title)
  if (!isDuplicate(anime)) {
    animes.push(anime)
  }
}

converter.multiSeason(animes)

database.writeFullAnimeList(animes)