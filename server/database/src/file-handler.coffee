fs = require 'fs'
path = require 'path'

jsonFormat = new RegExp('.*\.json$', 'ig')

class FileHandler
  constructor: () ->
    if process.env.NODE_ENV == 'test'
      this.baseDir = path.join(__dirname, '..', 'test_data')
    else
      this.baseDir = path.join(__dirname, '..', 'data')

    this.userDir = path.join(this.baseDir, 'user')
    this.songListPath = path.join(this.baseDir, 'song-list.json')
    this.botListPath = path.join(this.baseDir, 'chat-bot.json')
    this.emojiListPath = path.join(this.baseDir, 'emoji.json')

  getSongList: () ->
    return this._readFile(this.songListPath).sort( (a, b) =>
      if a.anime[0] == b.anime[0]
        if a.title > b.title
          return 1
        else if a.title < b.title
          return -1
        return 0
      else
        if a.anime[0] > b.anime[0]
          return 1
        return -1
    )

  getUserFiles: () ->
    userFiles = []
    for file in fs.readdirSync(this.userDir)
      if file.match(jsonFormat)
        userFiles.push(file.replace('.json', ''))
    return userFiles

  getUserList: (user) ->
    filepath = path.join(this.userDir, "#{user}.json")
    return this._readFile(filepath)

  getBotList: () ->
    return this._readFile(this.botListPath)

  getEmojiList: () ->
    return this._readFile(this.emojiListPath)

  writeUserList: (user, data) ->
    filepath = path.join(this.userDir, "#{user}.json")
    this._writeFile(filepath, data)

  writeEmojiList: (data) ->
    this._writeFile(this.emojiListPath, data)

  writeSongList: (data) ->
    this._writeFile(this.songListPath, data)

  _readFile: (filepath) ->
    return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))

  _writeFile: (filepath, data) ->
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2))

module.exports = FileHandler