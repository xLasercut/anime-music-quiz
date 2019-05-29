const database = require('../database/database.js')

var animes = database.getFullAnimeList()

var choices = []

for (var anime of animes) {
  if (!choices.includes(anime.name)) {
    choices.push(anime.name)
  }
}

database.writeUserChoices(choices)