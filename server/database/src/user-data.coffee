fs = require 'fs'
path = require 'path'

AbstractDatabase = require './abstract.coffee'

{ userDir } = require './constants.coffee'

jsonFile = new RegExp('.*\.json$', 'ig')

class UserList extends AbstractDatabase
  constructor: (filename) ->
    super(path.join(userDir, filename))

class UserLists
  constructor: () ->
    @lists = {}
    @files = []
    @init()

  init: () ->
    @initFiles()
    @initLists()

  initFiles: () ->
    for file in fs.readdirSync(userDir)
      if file.match(jsonFile)
        @files.push(file)

  initLists: () ->
    for file in @files
      @lists[file] = new UserList(file)

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
    for _key, userList of @lists
      userList.reload()

module.exports = { UserLists }