import Vue from 'vue'
import store from '../store/store.js'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'

var server = 'https://6a482e31.eu.ngrok.io'
if (process.env.NODE_ENV === 'development') {
  server = 'http://localhost:3001'
}

var options = {
  autoConnect: false
}

Vue.use(VueSocketio, io(server, options), { store })