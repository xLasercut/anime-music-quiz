export default {
  DISCONNECT(state) {
    state.filename = ''
  },
  UPDATE_FULL_LIST(state, list) {
    state.fullList = list
    state.loading = false
  },
  ADD_ANIME(state, anime) {
    state.userList.push(anime)
  },
  REMOVE_ANIME(state, anime) {
    for (var i = 0; i < state.userList.length; i++) {
      if (anime.src === state.userList[i].src && anime.name === state.userList[i].name) {
        state.userList.splice(i, 1)
      }
    }
  },
  UPDATE_USER_LIST(state, list) {
    state.userList = list
  },
  UPDATE_FILENAME(state, filename) {
    state.filename = filename
  },
  UPDATE_LOADING(state, status) {
    state.loading = status
  }
}