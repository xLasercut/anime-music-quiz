fs = require 'fs'
path = require 'path'

dbBasePath = path.join(__dirname, 'data')
userDbBasePath = path.join(dbBasePath, 'user')

_readFile = (filepath) ->
  return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))

_writeFile = (filepath, data) ->
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2))

jsonFile = new RegExp('.*\.json$', 'ig')

class AbstractDatabase
  constructor: (filepath) ->
    @filepath = filepath
    @db = []
    @initDb()

  initDb: () ->
    if !fs.existsSync(@filepath)
      _writeFile(@filepath, [])
    @db = _readFile(@filepath)

  read: () ->
    return @db

  write: (data) ->
    @db = data
    _writeFile(@filepath, @db)

  reload: () ->
    @db = _readFile(@filepath)


class RawList extends AbstractDatabase
  constructor: () ->
    super(path.join(dbBasePath, 'raw-list.json'))

class FullList extends AbstractDatabase
  constructor: () ->
    super(path.join(dbBasePath, 'full-list.json'))

class AnimeChoices extends AbstractDatabase
  constructor: () ->
    super(path.join(dbBasePath, 'anime-choices.json'))

class SongChoices extends AbstractDatabase
  constructor: () ->
    super(path.join(dbBasePath, 'song-choices.json'))

class UserList extends AbstractDatabase
  constructor: (filename) ->
    super(path.join(userDbBasePath, filename))

class UserLists
  constructor: () ->
    @lists = {}
    @files = []
    @init()

  init: () ->
    @initFiles()
    @initLists()

  initFiles: () ->
    for file in fs.readdirSync(userDbBasePath)
      if file.match(jsonFile)
        @files.push(file)

  initLists: () ->
    for file in @files
      @lists[file] = new UserList(file)

  write: (filename, data) ->
    @lists[filename].write(data)

  singleList: (filename) ->
    return @lists[filename].read()

  combinedList: (filenames) ->
    combinedList = []
    for file in filenames
      for userSong in @lists[file].read()
        dupe = false
        for song in combinedList
          if song.id == userSong.id
            dupe = true
        if !dupe
          combinedList.push(userSong)

    return combinedList

  reload: () ->
    for _key, userList of @lists
      userList.reload()

module.exports = { RawList, FullList, AnimeChoices, SongChoices, UserLists }