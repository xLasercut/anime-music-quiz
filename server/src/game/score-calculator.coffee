class ScoreCalculator
  constructor: (mode, currentSong, bet) ->
    @mode = mode
    @currentSong = currentSong
    @bet = bet

  calculateScore: (guess) ->
    if @mode == 'gamble'
      return @pointScoredBet(guess)
    else
      return @pointScoredNormal(guess)

  pointScoredBet: (guess) ->
    point = 0

    if @animeCorrect(guess.anime)
      point += 1
    else
      point += -1

    if @songCorrect(guess.song)
      point += 1

    return point * @bet

  pointScoredNormal: (guess) ->
    point = 0
    if @animeCorrect(guess.anime)
      point += 1

    if @songCorrect(guess.song)
      point += 1

    return point

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

module.exports = ScoreCalculator