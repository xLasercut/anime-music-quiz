import io from 'socket.io-client'

export default {
  LOGIN(state, data) {
    state.socket = io(data.server)
    state.socket.emit('SYNC_USER_LIST_FILES', null, (userListFiles) => {
      state.userListFiles = userListFiles
    })
  },
  DISCONNECT(state) {
    state.socket.close()
    state.socket = null
    state.filename = ''
  },
  SYNC_FULL_LIST(state) {
    state.loading = true
    state.socket.emit('SYNC_FULL_LIST', null, (fullList) => {
      state.fullList = fullList
      state.loading = false
    })
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
  SYNC_USER_LIST(state, list) {
    state.userList = list
  },
  UPDATE_FILENAME(state, filename) {
    state.filename = filename
    state.socket.emit('SYNC_USER_LIST', filename)
  }
}