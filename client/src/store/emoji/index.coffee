import state from './state.coffee'
import mutations from './mutations.coffee'
import getters from './getters.coffee'

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations
}