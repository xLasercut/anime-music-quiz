<template>
  <v-layout wrap>
    <leader-board></leader-board>
    <v-flex xs1></v-flex>
    <v-flex xs4>
      <video-window :volume="volume"></video-window>
      <countdown></countdown>
      <loading v-if="loading"></loading>
    </v-flex>
    <v-flex xs1></v-flex>
    <song-information></song-information>
  </v-layout>
</template>

<script>
  import LeaderBoard from './anime-information/LeaderBoard.vue'
  import Countdown from './anime-information/Countdown.vue'
  import VideoWindow from './anime-information/VideoWindow.vue'
  import SongInformation from './anime-information/SongInformation.vue'
  import Loading from '../shared/Loading.vue'

  export default {
    props: {
      volume: {
        type: Number
      }
    },
    components: { Countdown, VideoWindow, LeaderBoard, SongInformation, Loading },
    data() {
      return {
        socket: this.$store.state.game.socket,
        loading: false
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (_song, _start, _guessTime) => {
          this.loading = true
        })

        this.socket.on('START_COUNTDOWN', (_time) => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  .info-container {
    margin-top: 10px;
  }

  .video-container {
    min-height: 200px;
  }
</style>