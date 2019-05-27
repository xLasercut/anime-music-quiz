import io from 'socket.io-client'

export default {
  LOGIN(state, data) {
    state.socket = io(data.server)
  },
  DISCONNECT(state) {
    state.socket.close()
    state.socket = null
  },
  ADD_ANIME(state, anime) {
    state.userList.push(anime)
    state.socket.emit('UPDATE_USER_LIST', state.userList)
  },
  REMOVE_ANIME(state, anime) {
    for (var i = 0; i < state.userList.length; i++) {
      if (anime.src === state.userList[i].src && anime.name === state.userList[i].name) {
        state.userList.splice(i, 1)
      }
    }
    state.socket.emit('UPDATE_USER_LIST', state.userList)
  },
  UPDATE_USER_LIST(state, list) {
    state.userList = list
  }
}