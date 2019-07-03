fs = require 'fs'
path = require 'path'

AbstractDatabase = require './abstract.coffee'

{ userDir } = require './constants.coffee'

jsonFile = new RegExp('.*\.json$', 'ig')

class UserList extends AbstractDatabase
  constructor: (filename) ->
    super(path.join(userDir, filename))

  _isValid: (song) ->
    mandatoryFields = ['id', 'name', 'title', 'type', 'src']
    for field in mandatoryFields
      if !song[field]
        return false
    return true

  _isDuplicate: (song) ->
    for item in @db
      if song.id == item.id
        return true
    return false

  add: (song) ->
    if @_isValid(song) and !@_isDuplicate(song)
      @db.push(song)
      @write()

  remove: (song) ->
    if @_isValid(song)
      for item, i in @db
        if item.id == song.id
          @db.splice(i, 1)
      @write()

class UserLists
  constructor: () ->
    @lists = {}
    @files = []
    @_init()

  _init: () ->
    @_initFiles()
    @_initLists()

  _initFiles: () ->
    for file in fs.readdirSync(userDir)
      if file.match(jsonFile)
        @files.push(file)

  _initLists: () ->
    for file in @files
      @lists[file] = new UserList(file)

  add: (song, filename) ->
    if @_isValidFilename(filename)
      @lists[filename].add(song)

  remove: (song, filename) ->
    if @_isValidFilename(filename)
      @lists[filename].remove(song)

  write: (filename, data) ->
    @lists[filename].update(data)
    @lists[filename].write()

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
    @lists = {}
    @files = []
    @_init()
    for _key, userList of @lists
      userList.reload()

  _isValidFilename: (filename) ->
    if filename not in @files
      return false
    return true

module.exports = { UserLists }