path = require 'path'

AbstractDatabase = require './abstract.coffee'
{ animeDir } = require './constants.coffee'

class RawList extends AbstractDatabase
  constructor: () ->
    super(path.join(animeDir, 'raw-list.json'))

class FullList extends AbstractDatabase
  constructor: () ->
    super(path.join(animeDir, 'full-list.json'))

class AnimeChoices extends AbstractDatabase
  constructor: () ->
    super(path.join(animeDir, 'anime-choices.json'))

class SongChoices extends AbstractDatabase
  constructor: () ->
    super(path.join(animeDir, 'song-choices.json'))

class SongStats extends AbstractDatabase
  constructor: () ->
    super(path.join(animeDir, 'song-statistics.json'), {})

  updateUser: (currentSong, score, username) ->
    id = currentSong.id
    @checkKey(id, username)

    if !(username of @db[id]['user'])
      @db[id]['user'][username] = {
        total: 0,
        songCorrect: 0,
        songIncorrect: 0,
        animeCorrect: 0,
        animeIncorrect: 0
      }

    @db[id]['user'][username]['total'] += 1

    if score.correctAnime
      @db[id]['user'][username]['animeCorrect'] += 1
    else
      @db[id]['user'][username]['animeIncorrect'] += 1

    if score.correctSong
      @db[id]['user'][username]['songCorrect'] += 1
    else
      @db[id]['user'][username]['songIncorrect'] += 1

  updateSong: (currentSong) ->
    id = currentSong.id
    @checkKey(id)

    @db[id]['total'] += 1

  checkKey: (id, username) ->
    if !(id of @db)
      @db[id] = {
        total: 0,
        user: {}
      }

module.exports = { RawList, FullList, AnimeChoices, SongChoices, SongStats }