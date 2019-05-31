import Vue from 'vue'
import Vuex from 'vuex'

import game from './game/game-store.js'
import list from './list/list-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    mode: 'game'
  },
  getters: {
    color(state) {
      if (state.dark) {
        return '#212121'
      }
      return '#E0E0E0'
    }
  },
  mutations: {
    TOGGLE_DARK_MODE(state) {
      state.dark = !state.dark
      localStorage.dark = state.dark
    },
    CHANGE_MODE(state, mode) {
      state.mode = mode
    }
  },
  modules: {
    game: game,
    list: list
  }
})
