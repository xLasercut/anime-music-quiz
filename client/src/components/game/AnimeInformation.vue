<template>
  <el-row>
    <leader-board></leader-board>
    <el-col :span="8" v-loading="loading" class="video-container">
      <video-window></video-window>
      <countdown></countdown>
    </el-col>
    <song-information></song-information>
  </el-row>
</template>

<script>
  import LeaderBoard from './anime-information/LeaderBoard.vue'
  import Countdown from './anime-information/Countdown.vue'
  import VideoWindow from './anime-information/VideoWindow.vue'
  import SongInformation from './anime-information/SongInformation.vue'

  export default {
    components: { Countdown, VideoWindow, LeaderBoard, SongInformation },
    data() {
      return {
        socket: this.$store.state.socket,
        loading: false
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (_data) => {
          this.loading = true
        })

        this.socket.on('START_COUNTDOWN', () => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  .video-container {
    min-height: 200px;
  }
</style>