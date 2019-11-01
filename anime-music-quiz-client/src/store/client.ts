import { Module } from 'vuex'
import { ClientState, RootState } from '../assets/interfaces'
import { LoginMode } from '../assets/types'

let client: Module<ClientState, RootState> = {
  state: {
    admin: false,
    loginMode: 'game'
  },
  mutations: {
    CHANGE_LOGIN(state: ClientState, mode: LoginMode) {
      state.loginMode = mode
    },
    DISCONNECT(state: ClientState): void {
      state.admin = false
    },
    SOCKET_UPDATE_ADMIN_STATUS(state: ClientState, admin: boolean): void {
      state.admin = admin
    }
  }
}

export default client