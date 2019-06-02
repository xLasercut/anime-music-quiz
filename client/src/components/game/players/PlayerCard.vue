<template>
  <v-flex xs4 lg2>
    <v-tooltip v-model="show" :color="color()" min-width="160" max-width="160" top>
      <template #activator="{ on }">
        <div class="player-card">
          <img :src="`img/avatar/${player.avatar}.png`" :style="imgStyle(player)">
          <v-layout column align-center>
            <v-sheet class="player-name" :color="$store.getters.color">
              {{player.username}}
            </v-sheet>
            <v-sheet class="player-score" :color="$store.getters.color">
              {{player.score}}
            </v-sheet>
          </v-layout>
        </div>
      </template>
      {{guess('anime')}} - {{guess('song')}}
    </v-tooltip>
  </v-flex>
</template>

<script>
import { setTimeout } from 'timers';
  export default {
    props: {
      player: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        show: false,
        socket: this.$store.state.game.socket
      }
    },
    methods: {
      imgStyle(player) {
        if (player.host) {
          return { outline: '4px solid #E6A23C'}
        }
      },
      color() {
        var point = 0

        if (this.player.guess.anime === this.$store.state.game.currentSong.name ||
        this.$store.state.game.currentSong.altName.includes(this.player.guess.anime)) {
          point += 1
        }

        if (this.player.guess.song) {
          if (this.player.guess.song.toLowerCase() === this.$store.state.game.currentSong.title.toLowerCase()) {
            point += 1
          }
        }

        if (point === 2) {
          return 'success'
        }
        else if (point === 1) {
          return 'warning'
        }

        return 'error'
      },
      guess(type) {
        if (!this.player.guess[type]) {
          return '...'
        }
        return this.player.guess[type]
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('SHOW_GUESS', () => {
          this.show = true
          setTimeout(() => {
            this.show = false
          }, 8000)
        })
      }
    }
  }
</script>

<style scoped>
  .player-card {
    width: 100%;
    text-align: center;
  }

  img {
    width: 100%;
    max-width: 100px;
    margin: 0;
    padding: 0;
  }

  .player-name {
    width: 100% ;
    max-width: 150px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 5px;
    word-wrap: break-word;
  }

  .player-score {
    width: 100%;
    max-width: 50px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 0 0 20px 20px;
  }

  .v-tooltip__content {
    word-wrap: break-word;
    font-size: 12pt;
  }
</style>