import Vue from 'vue'
import store from '../store/store.js'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'

options = {
  autoConnect: false
}

Vue.use(VueSocketio, io(AMQ_SERVER, options), { store })