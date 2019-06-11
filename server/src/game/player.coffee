class Player
  constructor: (player, host, admin) ->
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
    @admin = admin
    @bet = 1
    @color = 'error'

  serialize: () ->
    return {
      username: @username,
      score: @score,
      avatar: @avatar,
      host: @host,
      guess: @guess,
      scoreGained: @scoreGained,
      admin: @admin,
      color: @color
    }

  setHost: () ->
    @host = true

  resetScore: () ->
    @score = 0

  setReady: (status) ->
    @ready = status

  setGuess: (guess) ->
    @guess = guess

  addPoint: (point) ->
    @score += point
    @scoreGained = point

  changeName: (name) ->
    @username = name

  changeBet: (bet) ->
    @bet = bet

  changeColor: (color) ->
    @color = color
module.exports = Player