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

  serialize: () ->
    return {
      username: @username,
      score: @score,
      avatar: @avatar,
      host: @host,
      guess: @guess
    }

  setHost: () ->
    @host = host

  resetScore: () ->
    @score = 0

module.exports = Player