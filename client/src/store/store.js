import Vue from 'vue'
import Vuex from 'vuex'

import game from './game/game-store.js'
import list from './list/list-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game: game,
    list: list
  }
})
