class Player
  constructor: (player, host, admin) ->
    #user info
    this.username = player.username
    this.score = player.score
    this.avatar = player.avatar
    this.color = 'error'
    #permissions
    this.host = host
    this.admin = admin

    this.guess = {
      song: '',
      anime: ''
    }
    this.ready = {
      song: false,
      select: false,
      guess: false
    }

  serialize: () ->
    return {
      username: this.username,
      score: this.score,
      avatar: this.avatar,
      host: this.host,
      guess: this.guess,
      admin: this.admin,
      color: this.color
    }

  setHost: () ->
    this.host = true

  resetScore: () ->
    this.score = 0

  setReady: (status, type) ->
    this.ready[type] = status

  setGuess: (guess) ->
    this.guess = guess

  setColor: (color) ->
    this.color = color

  addPoint: (point) ->
    this.score += point

  changeName: (name) ->
    this.username = name

  newRound: () ->
    this.guess = { song: '', anime: '' }
    this.color = 'error'
    this.ready = {
      select: false,
      song: false,
      guess: false
    }


module.exports = Player