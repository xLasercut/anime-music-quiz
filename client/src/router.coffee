import Vue from 'vue'
import Router from 'vue-router'
import Game from './views/Game.vue'
import Login from './views/Login.vue'
import ListPicker from './views/ListPicker.vue'
import MiscOperations from './views/MiscOperations.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/list-picker',
      name: 'list-picker',
      component: ListPicker
    },
    {
      path: '/misc',
      name: 'misc',
      component: MiscOperations
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
