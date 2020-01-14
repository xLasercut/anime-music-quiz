import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import ListPicker from './views/ListPicker.vue'
import MiscOps from './views/MiscOps.vue'
import Game from './views/Game.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/list-picker',
            name: 'list-picker',
            component: ListPicker
        },
        {
            path: '/misc',
            name: 'misc',
            component: MiscOps
        },
        {
            path: '/game',
            name: 'game',
            component: Game
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
