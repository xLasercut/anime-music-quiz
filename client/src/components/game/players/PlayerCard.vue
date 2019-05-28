<template>
  <v-flex xs2>
    <v-tooltip v-model="show" :color="color" min-width="160" max-width="160" top>
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
      {{guess}}
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
    computed: {
      guess() {
        if (!this.player.guess) {
          return '...'
        }
        return this.player.guess
      },
      color() {
        if (this.player.guess === this.$store.state.game.anime.name) {
          return 'success'
        }
        return 'error'
      }
    },
    methods: {
      imgStyle(player) {
        if (player.host) {
          return { outline: '4px solid #E6A23C'}
        }
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('SHOW_GUESS', () => {
          this.show = true
          setTimeout(() => {
            this.show = false
          }, 5000)
        })
      }
    }
  }
</script>

<style scoped>
  .player-card {
    width: 160px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
  }

  img {
    margin: 0;
    padding: 0;
  }

  .player-name {
    width: 100%;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 5px;
    word-wrap: break-word;
  }

  .player-score {
    width: 50px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 0 0 50px 50px;
  }

  .v-tooltip__content {
    word-wrap: break-word;
  }
</style>