const database = require('../database/database.js')

var userLists = database.userListFiles
var completeList = database.fullAnimeList


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
