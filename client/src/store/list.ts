import {Module} from 'vuex'
import {ListStoreState, RootStoreState, SongObj} from '../assets/interfaces'

let list: Module<ListStoreState, RootStoreState> = {
    state: {
        songList: [],
        users: [],
        userList: new Set(),
        user: ''
    },
    mutations: {
        DISCONNECT(state: ListStoreState): void {
            state.songList = []
            state.users = []
            state.userList = new Set()
            state.user = ''
        },
        UPDATE_USER(state: ListStoreState, user: string): void {
            state.user = user
        },
        SOCKET_UPDATE_SONG_LIST(state: ListStoreState, songList: Array<SongObj>): void {
            state.songList = songList
        },
        SOCKET_UPDATE_USERS(state: ListStoreState, users: Array<string>): void {
            state.users = users
        },
        SOCKET_UPDATE_USER_LIST(state: ListStoreState, data: { user: string, userList: Array<string> }): void {
            if (state.user === data.user) {
                state.userList = new Set(data.userList)
            }
        }
    },
    getters: {}
}

export default list