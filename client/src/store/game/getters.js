export default {
  songInformation(state) {
    return {
      Title: state.anime.title,
      Artist: state.anime.artist,
      Type: state.anime.type
    }
  }
}