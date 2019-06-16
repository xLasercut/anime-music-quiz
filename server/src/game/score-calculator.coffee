class ScoreCalculator
  constructor: (mode, currentSong) ->
    @mode = mode
    @currentSong = currentSong

  calculateScore: (guess, bet) ->
    if @mode == 'gamble'
      return @pointScoredBet(guess, bet)
    else
      return @pointScoredNormal(guess)

  pointScoredBet: (guess, bet) ->
    score = @pointScoredNormal(guess)

    if score.point == 0
      score['point'] -= bet
    else
      score['point'] = score.point * bet

    return score

  pointScoredNormal: (guess) ->
    point = 0
    correctAnime = false
    correctSong = false
    if @animeCorrect(guess.anime)
      point += 1
      correctAnime = true

    if @songCorrect(guess.song)
      point += 1
      correctSong = true

    return {
      point: point,
      color: @bannerColor(point),
      correctAnime: correctAnime,
      correctSong: correctSong
    }

  animeCorrect: (anime) ->
    if anime
      if anime.toLowerCase() == @currentSong.name.toLowerCase()
        return true

      for altName in @currentSong.altName
        if anime.toLowerCase() == altName.toLowerCase()
          return true
    return false

  songCorrect: (song) ->
    if song
      if song.toLowerCase() == @currentSong.title.toLowerCase()
        return true
    return false

  bannerColor: (point) ->
    if point == 2
      return 'success'
    else if point == 1
      return 'warning'

    return 'error'

module.exports = ScoreCalculator