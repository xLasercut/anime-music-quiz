import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    socket: null,
    animeList: [],
    avatar: 0,
    players: {},
    anime: {}
  },
  getters: {
    validState(state) {
      if (state.username && state.socket) {
        return true
      }
      return false
    },
    playerData(state) {
      return {
        username: state.username,
        avatar: state.avatar
      }
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
    login(state, data) {
      state.username = data.username
      state.avatar = data.avatar
      state.socket = io(data.server)
    },
    updateAnimeList(state, data) {
      state.animeList = data
    },
    UPDATE_PLAYERS(state, players) {
      state.players = players
    },
    UPDATE_ANIME(state, anime) {
      state.anime = anime
    }
  },
  actions: {

  }
})
