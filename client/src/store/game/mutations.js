import io from 'socket.io-client'

export default {
  LOGIN(state, data) {
    var player = {
      username: data.username,
      avatar: data.avatar,
      score: data.score
    }
    state.socket = io(data.server)
    state.socket.emit('SYNC_CHOICES', null, (choices) => {
      state.choices = choices
    })
    state.socket.emit('SYNC_USER_LIST_FILES', null, (userListFiles) => {
      state.userListFiles = userListFiles
    })
    state.socket.emit('SYNC_SETTINGS')
    state.socket.emit('SYNC_PLAYING')
    state.socket.emit('LOGIN', player)
  },
  SYNC_PLAYERS(state, players) {
    state.players = players
    state.host = state.players[state.socket.id].host
  },
  SYNC_CURRENT_SONG(state, song) {
    state.currentSong = song
  },
  SYNC_PLAYING(state, playing) {
    state.playing = playing
  },
  DISCONNECT(state) {
    state.socket.close()
    state.socket = null
    state.currentSong = {
      name: '',
      altName: [],
      title: '',
      src: '',
      artist: '',
      type: '',
      id: ''
    }
  },
  TOGGLE_ANSWER(state) {
    state.showAnswer = !state.showAnswer
  },
  START_GAME(state) {
    state.socket.emit('START_GAME')
  },
  STOP_GAME(state) {
    state.socket.emit('STOP_GAME')
  },
  UPDATE_VOLUME(state, volume) {
    state.volume = volume
  },
  SYNC_SETTINGS(state, settings) {
    state.settings = settings
  }
}