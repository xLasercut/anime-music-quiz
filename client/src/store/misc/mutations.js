export default {
  UPDATE_EMOJI_LIST(state, list) {
    state.emojiList = list
    state.loading = false
  },
  UPDATE_LOADING(state, status) {
    state.loading = status
  },
  ADD_EMOJI(state, emoji) {
    state.emojiList.push(emoji)
  },
  DELETE_EMOJI(state, emoji) {
    for (var i = 0; i < state.emojiList.length; i++) {
      if (emoji.command === state.emojiList[i].command) {
        state.emojiList.splice(i, 1)
      }
    }
  }
}