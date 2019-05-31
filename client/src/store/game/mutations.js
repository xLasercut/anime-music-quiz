import io from 'socket.io-client'

export default {
  LOGIN(state, data) {
    var player = {
      username: data.username,
      avatar: data.avatar,
      score: data.score
    }
    state.socket = io(data.server)
    state.socket.emit('LOGIN', player)
  },
  UPDATE_CHOICES(state, choices) {
    state.choices = choices
  },
  UPDATE_PLAYERS(state, players) {
    state.players = players
  },
  UPDATE_ANIME(state, anime) {
    state.anime = anime
  },
  UPDATE_HOST(state, id) {
    state.host = state.players[id].host
  },
  UPDATE_PLAYING(state, playing) {
    state.playing = playing
  },
  DISCONNECT(state) {
    state.socket.close()
    state.socket = null
    state.anime = {
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
    state.socket.emit('LOBBY')
  },
  UPDATE_VOLUME(state, volume) {
    state.volume = volume
  }
}