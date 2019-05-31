import io from 'socket.io-client'

export default {
  LOGIN(state, data) {
    state.socket = io(data.server)
    state.socket.emit('GET_USER_LIST_FILES')
  },
  DISCONNECT(state) {
    state.socket.close()
    state.socket = null
    state.filename = ''
  },
  RELOAD_ALL_ANIME(state) {
    state.socket.emit('GET_ALL_ANIME')
    state.loading = true
  },
  ADD_ANIME(state, anime) {
    state.userList.push(anime)
    state.socket.emit('UPDATE_USER_LIST', state.userList, state.filename)
  },
  REMOVE_ANIME(state, anime) {
    for (var i = 0; i < state.userList.length; i++) {
      if (anime.src === state.userList[i].src && anime.name === state.userList[i].name) {
        state.userList.splice(i, 1)
      }
    }
    state.socket.emit('UPDATE_USER_LIST', state.userList, state.filename)
  },
  UPDATE_USER_LIST(state, list) {
    state.userList = list
  },
  UPDATE_USER_LIST_FILES(state, files) {
    state.userListFiles = files
  },
  UPDATE_FILENAME(state, filename) {
    state.filename = filename
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}