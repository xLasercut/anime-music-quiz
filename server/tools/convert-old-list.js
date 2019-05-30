const database = require('../database/database.js')
const converter = require('./shared/converter.js')

var userLists = database.getUserListFiles()
var completeList = database.getFullAnimeList()


for (var userList of userLists) {
  var animes = database.getUserList(userList)

  for (var i = 0; i < animes.length; i++) {
    for (var anime of completeList) {
      if (animes[i].src === anime.src) {
        animes[i] = anime
        break
      }
    }
  }

  database.writeUserList(userList, animes)
}
