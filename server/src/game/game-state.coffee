{ userLists, animeChoices, songChoices } = require '../shared-classes.coffee'
ScoreCalculator = require './score-calculator.coffee'

class GameState
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject
    @playing = false
    @gameList = []
    @maxSongCount = 0
    @currentSongCount = 0
    @currentSong = {}
    @startPosition = 0
    @gameMode = 'normal'

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

    @logObject.writeLog('GAME004', { size: @gameList.length })

  startGame: (mode) ->
    @playing = true
    @io.emit('SYNC_PLAYING', @playing)
    @maxSongCount = @gameList.length
    @gameMode = mode
    @logObject.writeLog('GAME002', { songCount: @maxSongCount, mode: @gameMode })

  newSong: () ->
    @randomSong()
    @logObject.writeLog('GAME005', {
      number: @currentSongCount,
      title: @currentSong.title,
      anime: @currentSong.name,
      type: @currentSong.type,
      artist: @currentSong.artist
    })
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

  getScore: (guess, bet) ->
    scoreCalculator = new ScoreCalculator(@gameMode, @currentSong, bet)
    return scoreCalculator.calculateScore(guess)

  gameEnd: () ->
    if @currentSongCount < @maxSongCount
      return false
    return true

  reset: () ->
    @currentSong = {}
    @currentSongCount = 0
    @playing = false
    @io.emit('SYNC_PLAYING', @playing)
    @io.emit('RESET')

  choices: () ->
    return {
      anime: animeChoices.read(),
      song: songChoices.read()
    }

module.exports = GameState