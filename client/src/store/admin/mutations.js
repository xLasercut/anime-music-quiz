export default {
  SOCKET_SYNC_ADMIN(state, admin) {
    state.admin = admin
  },
  DISCONNECT(state) {
    state.admin = false
  }
}