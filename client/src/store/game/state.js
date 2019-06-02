export default {
  socket: null,
  choices: {
    anime: [],
    song: []
  },
  settings: {
    songNumber: 20,
    guessTime: 25,
    type: ['opening', 'ending'],
    lists: []
  },
  players: {},
  currentSong: {
    name: '',
    altName: [],
    title: '',
    src: '',
    artist: '',
    type: '',
    id: ''
  },
  host: false,
  playing: false,
  showAnswer: false,
  volume: 50,
  userListFiles: []
}