<template>
  <div class="player-card">
    <transition name="el-zoom-in-top">
      <div class="player-guess" v-show="showGuess" :style="guessStyle">
        {{guess}}
      </div>
    </transition>
    <img :src="`img/avatar/${player.avatar}.png`" :style="imgStyle(player)">
    <el-row class="player-name">
      {{player.username}}
    </el-row>
    <el-row type="flex" justify="center">
      <el-col class="player-score">
        {{player.score}}
      </el-col>
    </el-row>
  </div>
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
        showGuess: false,
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
      guessStyle() {
        var background = '#F56C6C'
        if (this.player.guess === this.$store.state.game.anime.name) {
          background = '#67C23A'
        }

        return { background: background }
      }
    },
    methods: {
      imgStyle(player) {
        var border = '1px solid #E4E7ED'
        if (player.host) {
          border = '1px solid #E6A23C'
        }
        return {border: border}
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('SHOW_GUESS', () => {
          this.showGuess = true
          setTimeout(() => {
            this.showGuess = false
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
  }

  img {
    margin: 0;
    padding: 0;
  }

  .player-name {
    width: 100%;
    font-size: 16pt;
    background: #E4E7ED;
    border-radius: 5px;
    word-wrap: break-word;
    padding: 4px;
  }

  .player-score {
    width: 50px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 0 0 50px 50px;
    padding: 2px;
  }

  .player-guess {
    width: 150px;
    top: 0;
    position: absolute;
    font-size: 12pt;
    word-wrap: break-word;
    padding: 5px;
    border-radius: 2px;
    color: white;
  }
</style>