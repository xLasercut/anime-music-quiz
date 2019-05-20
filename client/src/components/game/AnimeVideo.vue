<template>
  <div class="video-container">
    <div class="name-container" v-if="answer">{{anime.source}}</div>
    <div class="player-container">
      <audio ref="player" controls autoplay>
        <source :src="`https://openings.moe/video/${anime.file}.mp4`">
        Your browser does not support audio element
      </audio>
    </div>
    <div v-if="showTimer">
      {{time}}
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
        time: 10,
        countdown: null,
        showTimer: false
      }
    },
    watch: {
      anime(val) {
        this.$refs.player.load()
        this.startCountdown()
      }
    },
    methods: {
      startCountdown() {
        this.time = 10
        this.showTimer = true
        this.countdown = setInterval(() => {
          this.time -= 1
          if (this.time <= 0) {
            clearInterval(this.countdown)
            this.showTimer = false
          }
        }, 1000)
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