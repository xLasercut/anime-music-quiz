const fs = require('fs')

var animeList = JSON.parse(fs.readFileSync('./anime.json', { encoding: 'utf-8' }))

var done = []

var choices = []

for (var anime of animeList) {
  if (!done.includes(anime.name)) {
    choices.push({ value: anime.name })
    done.push(anime.name)
  }
}

fs.writeFileSync('./choices.json', JSON.stringify(choices, null, 2))