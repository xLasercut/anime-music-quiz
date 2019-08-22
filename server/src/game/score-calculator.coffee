class ScoreCalculator
  constructor: (currentSong) ->
    @currentSong = currentSong

  calculateScore: (guess) ->
    point = 0
    correctAnime = false
    correctSong = false
    if @_animeCorrect(guess.anime)
      point += 1
      correctAnime = true

    if @_songCorrect(guess.song)
      point += 1
      correctSong = true

    return {
      point: point,
      color: @_bannerColor(point),
      correctAnime: correctAnime,
      correctSong: correctSong
    }

  _animeCorrect: (anime) ->
    if anime
      if anime.toLowerCase() == @currentSong.name.toLowerCase()
        return true

      for altName in @currentSong.altName
        if anime.toLowerCase() == altName.toLowerCase()
          return true
    return false

  _songCorrect: (song) ->
    if song
      if song.toLowerCase() == @currentSong.title.toLowerCase()
        return true
    return false

  _bannerColor: (point) ->
    if point == 2
      return 'success'
    else if point == 1
      return 'warning'

    return 'error'

module.exports = ScoreCalculator