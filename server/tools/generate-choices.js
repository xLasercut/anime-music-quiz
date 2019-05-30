const database = require('../database/database.js')

var animes = database.getFullAnimeList()

var choices = []

for (var anime of animes) {
  if (!choices.includes(anime.name)) {
    choices.push(anime.name)
  }

  for (var name of anime.altName) {
    if (!choices.includes(name)) {
      choices.push(name)
    }
  }
}

database.writeUserChoices(choices)