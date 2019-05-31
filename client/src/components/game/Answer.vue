<template>
  <v-layout column align-center class="text-xs-center">
    <v-sheet class="song-num-container" :color="$store.getters.color">
      {{currentSong}} / {{maxSong}}
    </v-sheet>
    <v-sheet class="answer-container" :color="$store.getters.color">
      <b>{{answer()}}</b>
    </v-sheet>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        socket: this.$store.state.game.socket,
        currentSong: 0,
        maxSong: 0
      }
    },
    methods: {
      answer() {
        if (this.show) {
          return this.$store.state.game.anime.name
        }

        if (this.$store.state.game.showAnswer) {
          var index = Math.floor(Math.random() * this.$store.state.game.choices.anime.length)
          return this.$store.state.game.choices.anime[index]
        }

        return '?'
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (_song, _start, _guessTime) => {
          this.show = false
        })

        this.socket.on('TIME_UP', () => {
          this.show = true
        })

        this.socket.on('UPDATE_SONG_NUMBER', (numbers) => {
          this.currentSong = numbers.current
          this.maxSong = numbers.max
        })
      }
    }
  }
</script>

<style scoped>
  .song-num-container {
    border-radius: 50px 50px 0 0;
    padding-top: 5px;
    width: 100px;
    background: #E4E7ED;
  }

  .answer-container {
    min-width: 400px;
    background: #E4E7ED;
    font-size: 16pt;
    padding: 5px;
    border-radius: 5px;
  }
</style>