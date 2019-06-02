export default {
  songInformation(state) {
    return {
      Title: state.currentSong.title,
      Artist: state.currentSong.artist,
      Type: state.currentSong.type
    }
  }
}