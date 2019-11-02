import Vue from 'vue'
import Vuex from 'vuex'
import client from './client'
import list from './list'
import misc from './misc'
import game from './game'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    client: client,
    list: list,
    misc: misc,
    game: game
  }
})
