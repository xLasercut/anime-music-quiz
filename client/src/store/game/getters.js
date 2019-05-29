export default {
  players(state) {
    var n = 1
    var players = []
    var row = {}
    for (var key in state.players) {
      row[key] = state.players[key]
      if (n % 6 === 0 || Object.keys(state.players).length === n ) {
        players.push(row)
        row = {}
      }
      n += 1
    }
    return players
  },
  songInformation(state) {
    return {
      Title: state.anime.title,
      Artist: state.anime.artist,
      Type: state.anime.type
    }
  }
}