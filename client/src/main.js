import Vue from 'vue'
import './plugins/vuetify.coffee'
import App from './App.vue'
import router from './router.coffee'
import store from './store/store.coffee'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import './plugins/socket.coffee'
import VueYoutubeEmbed from 'vue-youtube-embed'

Vue.use(VueYoutubeEmbed)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
