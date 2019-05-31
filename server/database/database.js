const fs = require('fs')
const path = require('path')

const gameBase = path.join(__dirname)
const userBase = path.join(__dirname, 'user')

const fullAnimeListPath = path.join(gameBase, 'anime.json')
const animeChoicesPath = path.join(gameBase, 'anime-choices.json')
const songChoicesPath = path.join(gameBase, 'song-choices.json')
const rawAnimeListPath = path.join(gameBase, 'raw-anime.json')

const jsonfile = /.*\.json$/gi

function read(path) {
  return JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
}

function write(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

function backup(path) {
  var newPath = `${path}.back`
  fs.renameSync(path, newPath)
}

function isDuplicate(list, anime) {
  for (var item of list) {
    if ((anime.src === item.src || anime.title === item.title) && anime.name === item.name) {
      return true
    }
  }
  return false
}

class Database {
  getUserListFiles() {
    var userLists = fs.readdirSync(userBase)
    for (var i = 0; i < userLists.length; i++) {
      if (!userLists[i].match(jsonfile)) {
        userLists.splice(i, 1)
      }
    }
    return userLists
  }

  getFullAnimeList() {
    return read(fullAnimeListPath)
  }

  writeFullAnimeList(data) {
    backup(fullAnimeListPath)
    write(fullAnimeListPath, data)
  }

  getAnimeChoices() {
    return read(animeChoicesPath)
  }

  writeAnimeChoices(data) {
    write(animeChoicesPath, data)
  }

  getSongChoices() {
    return read(songChoicesPath)
  }

  writeSongChoices(data) {
    write(songChoicesPath, data)
  }

  getRawAnimeList() {
    return read(rawAnimeListPath)
  }

  writeRawAnimeList(data) {
    backup(rawAnimeListPath)
    write(rawAnimeListPath, data)
  }

  getUserList(filename) {
    var filepath = path.join(userBase, filename)
    return read(filepath)
  }

  writeUserList(filename, data) {
    var filepath = path.join(userBase, filename)
    if (filepath.match(jsonfile)) {
      write(filepath, data)
    }
  }

  getCombinedList(filenames) {
    var combinedList = []
    for (var filename of filenames) {
      var userList = this.getUserList(filename)
      for (var item of userList) {
        if (!isDuplicate(combinedList, item)) {
          combinedList.push(item)
        }
      }
    }
    return combinedList
  }
}

module.exports = new Database()