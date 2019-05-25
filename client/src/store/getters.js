export default {
  players(state) {
    var n = 1
    var players = []
    var row = {}
    for (var key in state.players) {
      row[key] = state.players[key]
      if (n % 5 === 0 || Object.keys(state.players).length === n ) {
        players.push(row)
        row = {}
      }
      n += 1
    }
    return players
  },
  playerScore(state) {
    var players = []
    for (var key in state.players) {
      players.push(state.players[key])
    }

    return players.sort(function(a, b) {
      return a.score > b.score
    })
  },
  songInformation(state) {
    var title = ''
    var artist = ''
    var type = ''
    if (state.anime.song) {
      title = state.anime.song.title
      artist = state.anime.song.artist
      type = state.anime.song.type
    }

    return {
      Title: title,
      Artist: artist,
      Type: type
    }
  }
}