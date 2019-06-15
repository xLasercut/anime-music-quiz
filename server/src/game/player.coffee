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

  setBet: (bet) ->
    @bet = bet

  setColor: (color) ->
    @color = color

  addPoint: (point) ->
    @score += point

  changeName: (name) ->
    @username = name

  newRound: () ->
    @guess = { song: '', anime: '' }
    @color = 'error'
    @bet = 1


module.exports = Player