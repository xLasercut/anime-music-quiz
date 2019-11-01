import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import io from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'
import VueYoutubeEmbed from 'vue-youtube-embed'

let options = {
  autoConnect: false
}

// @ts-ignore
Vue.use(VueSocketIOExt, io(AMQ_SERVER, options), { store })

Vue.config.productionTip = false

Vue.use(VueYoutubeEmbed)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
