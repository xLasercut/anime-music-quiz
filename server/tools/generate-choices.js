const database = require('../database/database.js')

var animes = database.fullAnimeList

var animeChoices = []
var songChoices = []

for (var anime of animes) {
  if (!animeChoices.includes(anime.name)) {
    animeChoices.push(anime.name)
  }

  for (var name of anime.altName) {
    if (!animeChoices.includes(name)) {
      animeChoices.push(name)
    }
  }

  if (!songChoices.includes(anime.title)) {
    songChoices.push(anime.title)
  }
}

database.writeAnimeChoices(animeChoices)
database.writeSongChoices(songChoices)