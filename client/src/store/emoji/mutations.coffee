export default
  UPDATE_LOADING: (state, status) ->
    state.loading = status
  ADD_EMOJI: (state, emoji) ->
    state.emojiList.push(emoji)
  DELETE_EMOJI: (state, emoji) ->
    for i in [0..state.emojiList.length - 1]
      if emoji.command == state.emojiList[i].command
        state.emojiList.splice(i, 1)
  SOCKET_SYNC_EMOJI_DATA: (state, list) ->
    state.emojiList = list