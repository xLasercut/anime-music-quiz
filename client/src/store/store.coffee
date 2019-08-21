import Vue from 'vue'
import Vuex from 'vuex'

import game from './game/index.coffee'
import list from './list/index.coffee'
import admin from './admin/index.coffee'
import emoji from './emoji/index.coffee'

Vue.use(Vuex)

export default new Vuex.Store(
  state:
    mode: 'game'
  getters:
    color: (state) ->
      if state.dark
        return '#212121'
      return '#E0E0E0'
  mutations:
    CHANGE_MODE: (state, mode) ->
      state.mode = mode
  modules:
    game: game,
    list: list,
    admin: admin,
    emoji: emoji
)
