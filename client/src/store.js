import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    self: {},
    socket: null,
    animeList: [],
    players: {},
    anime: {},
    host: false,
    id: ''
  },
  getters: {
    validState(state) {
      if (state.connectionId && state.socket) {
        return true
      }
      return false
    },
    players(state) {
      var n = 1
      var players = []
      var row = {}
      for (var key in state.players) {
        row[key] = state.players[key]
        if (n % 5 === 0 || Object.keys(state.players).length === n ) {
          players.push(row)
          row = {}
        }
        n += 1
      }
      return players
    },
    playerScore(state) {
      var players = []
      for (var key in state.players) {
        players.push(state.players[key])
      }

      return players.sort(function(a, b) {
        return a.score > b.score
      })
    },
    songInformation(state) {
      var title = ''
      var artist = ''
      var type = ''
      if (state.anime.song) {
        title = state.anime.song.title
        artist = state.anime.song.artist
        type = state.anime.title
      }

      return {
        Title: title,
        Artist: artist,
        Type: type
      }
    }
  },
  mutations: {
    LOGIN(state, data) {
      var player = {
        username: data.username,
        avatar: data.avatar,
        score: data.score
      }
      state.socket = io(data.server)
      state.socket.emit('LOGIN', player)
    },
    UPDATE_ANIME_LIST(state, data) {
      state.animeList = data
    },
    UPDATE_PLAYERS(state, players) {
      state.players = players
    },
    UPDATE_ANIME(state, anime) {
      state.anime = anime
    },
    UPDATE_HOST(state, id) {
      if (state.socket.id === id) {
        state.host = true
      }
      else {
        state.host = false
      }
    }
  },
  actions: {

  }
})
