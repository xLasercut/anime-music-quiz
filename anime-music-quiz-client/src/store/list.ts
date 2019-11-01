import { Module } from "vuex";
import { ListState, RootState, SongObj } from '../assets/interfaces'

let list: Module<ListState, RootState> = {
  state: {
    songList: [],
    users: [],
    userList: new Set(),
    user: ''
  },
  mutations: {
    DISCONNECT(state: ListState): void {
      state.songList = []
      state.users = []
      state.userList = new Set()
      state.user = ''
    },
    UPDATE_USER(state: ListState, user: string): void {
      state.user = user
    },
    SOCKET_UPDATE_SONG_LIST(state: ListState, songList: Array<SongObj>): void {
      state.songList = songList
    },
    SOCKET_UPDATE_USERS(state: ListState, users: Array<string>): void {
      state.users = users
    },
    SOCKET_UPDATE_USER_LIST(state: ListState, data: { user: string, userList: Array<string> }): void {
      if (state.user === data.user) {
        state.userList = new Set(data.userList)
      }
    }
  },
  getters: {

  }
}

export default list