import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    socket: null,
    animeList: []
  },
  getters: {
    validState(state) {
      if (state.username && state.socket) {
        return true
      }
      return false
    }
  },
  mutations: {
    login(state, data) {
      state.username = data.username
      state.socket = io(data.server)
    },
    updateAnimeList(state, data) {
      state.animeList = data
    }
  },
  actions: {

  }
})
