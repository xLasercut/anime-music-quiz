export default
  UPDATE_PLAYERS: (state, data) ->
    state.players = data.players
    state.host = state.players[data.id].host
  UPDATE_CURRENT_SONG: (state, song) ->
    state.currentSong = song
  DISCONNECT: (state) ->
    state.currentSong = {
      name: '',
      altName: [],
      title: '',
      src: '',
      artist: '',
      type: '',
      id: ''
    }
  UPDATE_VOLUME: (state, volume) ->
    state.volume = volume
  UPDATE_SETTINGS: (state, settings) ->
    state.settings = settings
  SOCKET_SYNC_PLAYING: (state, playing) ->
    state.playing = playing
  SOCKET_SYNC_CHOICES: (state, choices) ->
    state.choices = choices
  SOCKET_RESET_SELECTOR: (state) ->
    state.selector = false
  SOCKET_SELECT_SONG: (state) ->
    state.selector = true
