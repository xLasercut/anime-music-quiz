const database = require('../database/database.js')

var fullList = database.getFullAnimeList()
var animes = database.getUserList('taj.json')

var diff = []

function notInList(anime) {
  if (!anime.id) {
    return true
  }
  for (var item of fullList) {
    if (item.src === anime.src) {
      return false
    }
  }
  return true
}

for (var anime of animes) {
  if (notInList(anime)) {
    diff.push(anime)
  }
}

console.log(diff)