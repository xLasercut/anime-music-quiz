<template>
  <div class="video-container">
    <div class="name-container" v-if="answer || answerToggle">{{anime.source}}</div>
    <div class="player-container">
      <audio
        ref="player"
        @loadeddata="sendLoadedSignal()"
        controls autoplay
      >
        <source :src="`https://openings.moe/video/${anime.file}.mp4`">
        Your browser does not support audio element
      </audio>
    </div>
    <div v-if="showTimer">
      {{time}}
    </div>
    <div>
      <el-button @click="toggle()">Toggle Answer</el-button>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
  export default {
    props: {
      anime: {
        type: Object
      },
      answer: {
        type: Boolean
      }
    },
    data() {
      return {
        time: 30,
        countdown: null,
        showTimer: false,
        answerToggle: false,
        socket: this.$store.state.socket
      }
    },
    watch: {
      anime(val) {
        this.$refs.player.load()
      }
    },
    methods: {
      startCountdown() {
        this.time = 30
        this.showTimer = true
        this.countdown = setInterval(() => {
          this.time -= 1
          if (this.time <= 0) {
            clearInterval(this.countdown)
            this.showTimer = false
          }
        }, 1000)
      },
      toggle() {
        this.answerToggle = !this.answerToggle
      },
      sendLoadedSignal() {
        this.socket.emit('AUDIO_LOADED')
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('START_COUNTDOWN', () => {
          this.startCountdown()
        })
      }
    }
  }
</script>

<style scoped>
  .video-container {
    width: calc(100% - 20px);
    height: 200px;
    padding: 10px;
  }
</style>