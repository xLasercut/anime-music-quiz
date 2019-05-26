import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ListPicker from './views/ListPicker.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/list-picker',
      name: 'list-picker',
      component: ListPicker
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
