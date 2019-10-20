uuid = require 'uuid/v4'

FileHandler = require './src/file-handler.coffee'

fileHandler = new FileHandler()


class AMQDatabase
  constructor: (logger) ->
    this.logger = logger
    this.songList = []
    this.songIds = []
    this.choices = {
      song: [],
      anime: []
    }
    this.userFiles = []
    this.userLists = {}
    this.emojiList = []
    this.botList = []
    this.loadDb()

  loadDb: () ->
    this.songList = fileHandler.getSongList()
    this._generateSecondaryDb()
    this._generateUserDb()
    this._generateMiscDb()

  addUserSong: (user, songId) ->
    if songId in this.songIds
      if songId in this.userLists[user]
        this.logger.writeLog('DATA002', { file: user, songId: songId })
      else
        this.userLists[user].push(songId)
        fileHandler.writeUserList(user, this.userLists[user])
    else
      this.logger.writeLog('DATA001', { file: user, songId: songId })

  removeUserSong: (user, songId) ->
    if songId in this.userLists[user]
      index = this.userLists[user].indexOf(songId)
      this.userLists[user].splice(index, 1)
      fileHandler.writeUserList(user, this.userLists[user])
    else
      this.logger.writeLog('DATA001', { file: user, songId: songId })

  addEmoji: (emoji) ->
    if this._isValidEmoji(emoji) and !this._isDuplicateEmoji(emoji)
      this.emojiList.push(emoji)
      fileHandler.writeEmojiList(this.emojiList)

  removeEmoji: (emoji) ->
    if this._isValidEmoji(emoji)
      for item, index in this.emojiList
        if item.command.toLowerCase() == emoji.command.toLowerCase()
          this.emojiList.splice(index, 1)
          break
      fileHandler.writeEmojiList(this.emojiList)

  getCombinedList: (users) ->
    combinedList = []
    combinedSongIds = this._getCombinedSongIds(users)
    for song in this.songList
      if song.songId in combinedSongIds
        combinedList.push(song)

    return combinedList.sort( (a, b) =>
      return Math.random() - 0.5
    )

  editSongList: (song) ->
    for item, index in this.songList
      if item.songId == song.songId
        this.songList[index] = song
        fileHandler.writeSongList(this.songList)
        return true
    return false

  addSongToSongList: (song) ->
    if process.env.NODE_ENV == 'test'
      song['songId'] = 'a22c2206-b504-4f11-a380-e787f2d8e449'
    else
      song['songId'] = uuid()
    this.songList.push(song)
    fileHandler.writeSongList(this.songList)

  removeSongFromSongList: (song) ->
    for item, index in this.songList
      if item.songId == song.songId
        this.songList.splice(index, 1)
        fileHandler.writeSongList(this.songList)
        return true
    return false

  _getCombinedSongIds: (users) ->
    combinedSongIds = []
    for user in users
      for songId in this.userLists[user]
        if songId not in combinedSongIds
          combinedSongIds.push(songId)
    return combinedSongIds

  _generateSecondaryDb: () ->
    animeChoices = []
    songChoices = []
    songIds = []
    for song in this.songList
      songId = song.songId
      title = song.title

      if songId in songIds
        throw new Error("DUPLICATE SONG ID: #{songId}")
      else
        songIds.push(songId)

      if title not in songChoices
        songChoices.push(title)

      for anime in song.anime
        if anime not in animeChoices
          animeChoices.push(anime)

    this.songIds = songIds
    this.choices = {
      anime: animeChoices.sort((a, b) =>
        if a > b
          return 1
        return -1
      ),
      song: songChoices.sort((a, b) =>
        if a > b
          return 1
        return -1
      )
    }

  _generateUserDb: () ->
    this.userLists = {}
    this.userFiles = fileHandler.getUserFiles()
    for file in this.userFiles
      this.userLists[file] = fileHandler.getUserList(file)

  _generateMiscDb: () ->
    this.emojiList = fileHandler.getEmojiList()
    this.botList = fileHandler.getBotList()

  _isDuplicateEmoji: (emoji) ->
    for item in this.emojiList
      if item.command.toLowerCase() == emoji.command.toLowerCase()
        return true
    return false

  _isValidEmoji: (emoji) ->
    mandatoryFields = ['command', 'src', 'type']
    for field in mandatoryFields
      if !emoji[field]
        return false
    return true

module.exports = AMQDatabase
