const file = require('./shared/file.js')

var animeList = file.read('./anime.json')

var done = []

var choices = []

for (var anime of animeList) {
  if (!done.includes(anime.name)) {
    choices.push(anime.name)
    done.push(anime.name)
  }
}

file.write('./choices.json', choices)