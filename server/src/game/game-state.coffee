class GameState
  constructor: (io, logger, db) ->
    this.io = io
    this.logger = logger
    this.db = db
    this.playing = false
    this.gameList = []
    this.maxSongCount = 0
    this.currentSongCount = 0
    this.currentSong = {}
    this.songOverride = null
    this.startPosition = 0

  startListeners: (socket) ->
    socket.on 'SONG_OVERRIDE', (song, callback) =>
      this.songOverride = song
      this.logger.writeLog('GAME008', {
        title: song.title,
        artist: song.artist,
        anime: song.anime[0],
        type: song.type,
        id: socket.id
      })
      callback(song)

  generateGameList: (settings) ->
    combinedList = this.db.getCombinedList(settings.lists)
    dupes = []
    this.gameList = []
    while this.gameList.length < settings.songCount and combinedList.length > 0
      index = Math.floor(Math.random() * combinedList.length)
      anime = combinedList[index].anime[0]
      if anime not in dupes or settings.duplicate
        this.gameList.push(combinedList[index])
        dupes.push(anime)
      combinedList.splice(index, 1)

    this.logger.writeLog('GAME004', { size: this.gameList.length })


  startGame: (mode) ->
    this.playing = true
    this.io.emit('SYNC_PLAYING', this.playing)
    this.maxSongCount = this.gameList.length
    this.logger.writeLog('GAME002', { songCount: this.maxSongCount, mode: mode })

  newSong: () ->
    this.selectSong()
    this.syncSongCount()
    this.logger.writeLog('GAME005', {
      number: this.currentSongCount,
      title: this.currentSong.title,
      anime: this.currentSong.name,
      type: this.currentSong.type,
      artist: this.currentSong.artist
    })
    this.startPosition = Math.random()
    this.io.emit('NEW_SONG', this.currentSong, this.startPosition)

  selectSong: () ->
    i = Math.floor(Math.random() * this.gameList.length)
    this.currentSong = this.gameList[i]
    this.gameList.splice(i, 1)
    this.currentSongCount += 1
    if this.songOverride
      this.currentSong = this.songOverride
      this.songOverride = null

  syncSongCount: () ->
    count = {
      current: this.currentSongCount,
      max: this.maxSongCount
    }
    this.io.emit('SYNC_SONG_COUNT', count)

  gameEnd: () ->
    if this.currentSongCount < this.maxSongCount
      return false
    return true

  reset: () ->
    this.currentSong = {}
    this.songOverride = null
    this.currentSongCount = 0
    this.playing = false
    this.io.emit('SYNC_PLAYING', this.playing)
    this.io.emit('RESET')

  choices: () ->
    return {
      anime: animeChoices.read(),
      song: songChoices.read()
    }

module.exports = GameState
