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

  _getCombinedSongIds: (users) ->
    combinedSongIds = []
    for user in users
      for songId in this.userLists[user]
        if songId not in combinedSongIds
          combinedSongIds.push(songId)
    return combinedSongIds

  _generateSecondaryDb: () ->
    this.songIds = []
    this.choices = {
      song: [],
      anime: []
    }
    for song in this.songList
      this._addSongIds(song)
      this._addChoices(song)


  _addSongIds: (song) ->
    songId = song.songId
    if songId in this.songIds
      throw new Error("DUPLICATE SONG ID: #{songId}")
    else
      this.songIds.push(songId)

  _addChoices: (song) ->
    title = song.title
    if title not in this.choices.song
      this.choices.song.push(title)

    for anime in song.anime
      if anime not in this.choices.anime
        this.choices.anime.push(anime)

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
