const database = require('../database/database.js')

class AnimeListManager {
  constructor(io, logger) {
    this.completeList = database.fullAnimeList
    this.choices = {
      anime: database.animeChoices,
      song: database.songChoices
    }
    this.userListFiles = database.userListFiles
    this.logger = logger
    this.userLists = {}
    this.initialiseUserList()
    this.io = io
  }

  initialiseUserList() {
    for (var filename of this.userListFiles) {
      this.userLists[filename] = this.getUserListDisk(filename)
    }
  }

  listener(socket) {
    socket.on('SYNC_FULL_LIST', (_data, callback) => {
      callback(this.completeList)
    })

    socket.on('SYNC_USER_LIST_FILES', (_data, callback) => {
      callback(this.userListFiles)
    })

    socket.on('SYNC_USER_LIST', (filename) => {
      socket.emit('SYNC_USER_LIST', this.getUserList(filename), filename)
    })

    socket.on('SYNC_CHOICES', (_data, callback) => {
      callback(this.choices)
    })

    socket.on('UPDATE_USER_LIST', (list, filename) => {
      if (filename.match(/.*\.json$/gi)) {
        try {
          this.updateUserList(filename, list)
          this.io.emit('SYNC_USER_LIST', this.getUserList(filename), filename)
        }
        catch (e) {
          this.logger.error(e)
        }
      }
      else {
        this.logger.error(`incorrect filename to write - filename=${filename}`)
      }
    })
  }

  generateGameList(songNumber, lists) {
    var userList = database.getCombinedList(lists)
    var gameList = []
    var dupe = []

    while (gameList.length < songNumber && userList.length > 0) {
      var index = Math.floor(Math.random() * userList.length)
      var name = userList[index].name
      if (!dupe.includes(name)) {
        gameList.push(userList[index])
        dupe.push(name)
      }
      userList.splice(index, 1)
    }
    this.logger.info(`generated game list - size=${gameList.length}`)
    return gameList
  }

  getUserListDisk(filename) {
    var list = database.getUserList(filename)
    this.logger.info(`fetched ${filename}`)
    return list
  }

  getUserList(filename) {
    if (filename in this.userLists) {
      return this.userLists[filename]
    }
    return []
  }

  updateUserList(filename, list) {
    this.userLists[filename] = list
    database.writeUserList(filename, list)
    this.logger.info(`updated ${filename}`)
  }

}

module.exports = AnimeListManager