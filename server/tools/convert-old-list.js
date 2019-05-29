const database = require('../database/database.js')
const converter = require('./shared/converter.js')

var userLists = database.getUserListFiles()


for (var userList of userLists) {
  var animes = database.getUserList(userList)
  for (var i = 0; i < animes.length; i++) {
    animes[i].name = converter.mapName(animes[i].name)
  }
  database.writeUserList(userList, animes)
}
