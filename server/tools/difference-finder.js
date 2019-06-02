const database = require('../database/database.js')

var fullList = database.fullAnimeList
var animes = database.getUserList('laser.json')

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