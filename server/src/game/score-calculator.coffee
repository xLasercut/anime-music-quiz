class ScoreCalculator
  constructor: (currentSong) ->
    this.currentSong = currentSong

  calculateScore: (guess) ->
    point = 0
    if this._animeCorrect(guess.anime)
      point += 1

    if this._songCorrect(guess.song)
      point += 1
      correctSong = true

    return {
      point: point,
      color: this._bannerColor(point)
    }

  _animeCorrect: (animeGuess) ->
    if animeGuess
      for anime in this.currentSong.anime
        if animeGuess.toLowerCase() == anime.toLowerCase()
          return true
    return false

  _songCorrect: (songGuess) ->
    if songGuess
      if songGuess.toLowerCase() == this.currentSong.title.toLowerCase()
        return true
    return false

  _bannerColor: (point) ->
    if point == 2
      return 'success'
    else if point == 1
      return 'warning'

    return 'error'

module.exports = ScoreCalculator