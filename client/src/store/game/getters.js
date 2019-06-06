export default {
  songInformation(state) {
    return {
      Title: state.currentSong.title,
      Artist: state.currentSong.artist,
      Type: state.currentSong.type
    }
  },
  kickPlayerList(state) {
    list = []
    for (var id in state.players) {
      if (!state.players[id].admin) {
        list.push({
          player: state.players[id].username,
          id: id
        })
      }
    }
    return list
  }
}