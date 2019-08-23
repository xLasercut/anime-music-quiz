import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
Game = () => import('./views/Game.vue')
ListPicker = () => import('./views/ListPicker.vue')
MiscOperations = () => import('./views/MiscOperations.vue')

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
