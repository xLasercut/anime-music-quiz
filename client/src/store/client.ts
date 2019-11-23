import {Module} from 'vuex'
import {ClientStoreState, RootStoreState} from '../assets/interfaces'
import {LoginMode} from '@/assets/types'

let client: Module<ClientStoreState, RootStoreState> = {
  state: {
    admin: false,
    loginMode: 'game'
  },
  mutations: {
    CHANGE_LOGIN(state: ClientStoreState, mode: LoginMode) {
      state.loginMode = mode
    },
    DISCONNECT(state: ClientStoreState): void {
      state.admin = false
    },
    SOCKET_UPDATE_ADMIN_STATUS(state: ClientStoreState, admin: boolean): void {
      state.admin = admin
    }
  }
}

export default client