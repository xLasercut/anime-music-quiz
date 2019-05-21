import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    socket: null,
    animeList: [],
    avatar: 0
  },
  getters: {
    validState(state) {
      if (state.username && state.socket) {
        return true
      }
      return false
    },
    playerData(state) {
      return {
        username: state.username,
        avatar: state.avatar
      }
    }
  },
  mutations: {
    login(state, data) {
      state.username = data.username
      state.avatar = data.avatar
      state.socket = io(data.server)
    },
    updateAnimeList(state, data) {
      state.animeList = data
    }
  },
  actions: {

  }
})
