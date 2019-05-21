<template>
  <el-popover placement="top" v-model="showGuess">
    {{playerGuess}}
    <el-card class="player-card" slot="reference">
      <span class="player-name">
        {{name}}
      </span>
      <img :src="`img/avatar/${avatar}.png`">
      <span class="player-score">
        <span>Score: </span>{{score}}
      </span>
    </el-card>
  </el-popover>
</template>

<script>
import { setTimeout } from 'timers';
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true
      },
      guess: {
        type: String
      }
    },
    watch: {
      guess(val) {
        console.log(val)
        this.showGuess = true
        setTimeout(() => {
          this.showGuess = false
        }, 5000)
      }
    },
    data() {
      return {
        showGuess: false
      }
    },
    computed: {
      playerGuess() {
        if (!this.guess) {
          return '...'
        }
        return this.guess
      }
    }
  }
</script>

<style scoped>
  .player-card {
    width: 150px;
  }

  .player-name {
    font-size: 16pt;
  }

  .player-score {
  }

  .player-guess {
    position: relative;
    padding: 10px;
    background: red;
    float: left;
  }
</style>