import getters from './getters.coffee'
import state from './state.coffee'
import mutations from './mutations.coffee'

export default
  namespaced: true
  state: state
  getters: getters
  mutations: mutations