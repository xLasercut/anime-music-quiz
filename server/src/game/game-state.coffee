{ AnimeChoices, SongChoices } = require '../../database/database.coffee'
{ userLists } = require '../shared-classes.coffee'

animeChoices = new AnimeChoices()
songChoices = new SongChoices()

class GameState
  constructor: (io, logger) ->
    @io = io
    @logger = logger
    @choices = {
      anime: animeChoices.read(),
      song: songChoices.read()
    }
    @playing = false
    @gameList = []
    @maxSongCount = 0
    @currentSongCount = 0
    @currentSong = {}
    @startPosition = 0

  generateGameList: (songCount, lists) ->
    combinedList = userLists.combinedList(lists)
    @gameList = []
    dupe = []

    while @gameList.length < songCount and combinedList.length > 0
      i = Math.floor(Math.random() * combinedList.length)
      name = combinedList[i].name
      if !dupe.includes(name)
        @gameList.push(combinedList[i])
        dupe.push(name)
      combinedList.splice(i, 1)

    @logger.info("generated game list - size=#{@gameList.length}")

  startGame: () ->
    @playing = true
    @io.emit('SYNC_PLAYING', @playing)
    @maxSongCount = @gameList.length
    @logger.info("starting new round - songCount=#{@maxSongCount}")

  newSong: () ->
    @randomSong()
    @logger.info("new song - number=#{@currentSongCount} name=#{@currentSong.title} anime=#{@currentSong.name}")
    @startPosition = Math.random()
    @io.emit('NEW_SONG', @currentSong, @startPosition)

  randomSong: () ->
    i = Math.floor(Math.random() * @gameList.length)
    @currentSong = @gameList[i]
    @gameList.splice(i, 1)
    @currentSongCount += 1
    @syncSongCount()

  syncSongCount: () ->
    count = {
      current: @currentSongCount,
      max: @maxSongCount
    }
    @io.emit('SYNC_SONG_COUNT', count)

  pointScored: (guess) ->
    point = 0
    if guess.anime == @currentSong.name or @currentSong.altName.includes(guess.anime)
      point += 1

    if guess.song
      if guess.song.toLowerCase() == @currentSong.title.toLowerCase()
        point += 1

    return point

  roundEnd: () ->
    if @currentSongCount < @maxSongCount
      return false
    return true

  reset: () ->
    @currentSong = {}
    @currentSongCount = 0
    @playing = false
    @io.emit('SYNC_PLAYING', @playing)
    @io.emit('RESET')

module.exports = GameState