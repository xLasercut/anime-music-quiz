class Player
  constructor: (player, host) ->
    @username = player.username
    @score = player.score
    @avatar = player.avatar
    @host = host
    @guess = {
      song: '',
      anime: ''
    }
    @ready = false
    @scoreGained = 0

  serialize: () ->
    return {
      username: @username,
      score: @score,
      avatar: @avatar,
      host: @host,
      guess: @guess,
      scoreGained: @scoreGained
    }

  setHost: () ->
    @host = true

  resetScore: () ->
    @score = 0

  setReady: () ->
    @ready = true

  readyClear: () ->
    @ready = false

  setGuess: (guess) ->
    @guess = guess

  addPoint: (point) ->
    @score += point
    @scoreGained = point

module.exports = Player