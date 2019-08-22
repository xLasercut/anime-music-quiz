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
    @ready = {
      song: false,
      select: false,
      guess: false
    }
    @admin = admin
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

  setReady: (status, type) ->
    @ready[type] = status

  setGuess: (guess) ->
    @guess = guess

  setColor: (color) ->
    @color = color

  addPoint: (point) ->
    @score += point

  changeName: (name) ->
    @username = name

  newRound: () ->
    @guess = { song: '', anime: '' }
    @color = 'error'
    @ready = {
      select: false,
      song: false,
      guess: false
    }


module.exports = Player