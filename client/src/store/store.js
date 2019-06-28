import Vue from 'vue'
import Vuex from 'vuex'

import game from './game/game-store.js'
import list from './list/list-store.js'
import admin from './admin/admin-store.js'
import misc from './misc/misc-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    mode: 'game',
    userListFiles: []
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
    },
    SOCKET_SYNC_USER_LIST_FILES(state, userListFiles) {
      state.userListFiles = userListFiles
    }
  },
  modules: {
    game: game,
    list: list,
    admin: admin,
    misc: misc
  }
})
