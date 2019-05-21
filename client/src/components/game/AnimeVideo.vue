<template>
  <div class="video-container" v-loading="loading">
    <div class="player-container">
      <audio ref="player" @loadeddata="sendLoadedSignal()">
        <source :src="`https://openings.moe/video/${anime.file}.mp4`" v-if="anime.file">
        Your browser does not support audio element
      </audio>
    </div>
    <answer :name="anime.source" :toggle="toggle"></answer>
    <countdown></countdown>
  </div>
</template>

<script>
  import Countdown from './anime-video/Countdown.vue'
  import Answer from './anime-video/Answer.vue'

  export default {
    props: {
      toggle: {
        type: Boolean
      }
    },
    components: { Countdown, Answer },
    data() {
      return {
        socket: this.$store.state.socket,
        anime: {},
        loading: false
      }
    },
    methods: {
      sendLoadedSignal() {
        this.socket.emit('AUDIO_LOADED')
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (data) => {
          this.anime = data
          this.loading = true
          this.$refs.player.load()
        })

        this.socket.on('START_COUNTDOWN', () => {
          this.loading = false
          this.$refs.player.play()
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