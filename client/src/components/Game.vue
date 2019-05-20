<template>
  <div class="game-container">
    <anime-video :anime="anime" :answer="answer"></anime-video>
    <guess-input v-model="guess"></guess-input>
    <players v-model="players" @start="start()"></players>
  </div>
</template>

<script>
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeVideo from './game/AnimeVideo.vue'

  export default {
    components: {
      GuessInput,
      Players,
      AnimeVideo
    },
    data() {
      return {
        socket: this.$store.state.socket,
        players: {},
        anime: {},
        guess: '',
        answer: false
      }
    },
    methods: {
      start() {
        this.socket.emit('START_GAME', 'test')
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_PLAYERS_LIST', (data) => {
          this.players = data
        })

        this.socket.on('UPDATE_ANIME_LIST', (data) => {
          this.$store.commit('updateAnimeList', data)
        })

        this.socket.on('PLAY_SONG', (data) => {
          this.answer = false
          this.guess = ''
          this.anime = data
        })

        this.socket.on('COLLECT_RESULT', () => {
          this.socket.emit('GUESS', this.guess)
          this.answer = true
        })
      }
    }
  }
</script>

<style scoped>
  .game-container {
    height: 100%;
    width: calc(100% - 420px);
    float: left;
  }
</style>