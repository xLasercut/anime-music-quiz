import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {

  },
  options: {
    customProperties: true
  },
  iconfont: 'fa',
  icons: {
    prev: 'fa-angle-left',
    next: 'fa-angle-right'
  }
})
