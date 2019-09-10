<template>
  <v-col cols="12" sm="6">
    <v-row justify="center">
      <v-col cols="12" class="video-container">
        <youtube-video ref="youtube" @loaded="confirmLoad()" :volume="volume" :start="start" v-show="show.youtube">
        </youtube-video>
        <normal-video ref="normal" @loaded="confirmLoad()" :volume="volume" :start="start" v-show="show.normal">
        </normal-video>
        <video-overlay v-show="overlay">
          <timer :maxTime="guessTime" ref="timer" v-show="!loading"></timer>
          <loading v-if="loading"></loading>
        </video-overlay>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="coffee">
  import YoutubeVideo from './video-window/YoutubeVideo.vue'
  import NormalVideo from './video-window/NormalVideo.vue'
  import Loading from '../../../components/Loading.vue'
  import VideoOverlay from './video-window/VideoOverlay.vue'
  import Timer from '../shared/Timer.vue'

  export default
    components: { YoutubeVideo, NormalVideo, Timer, Loading, VideoOverlay }
    props:
      volume: {
        type: Number
      }
    data: () ->
      show: {
        youtube: false,
        normal: false
      },
      start: 0,
      loading: false,
      overlay: false,
      guessTime: 30
    sockets:
      NEW_SONG: (song, position) ->
        this.loading = true
        this.resetVideo()
        this.$store.commit('game/UPDATE_CURRENT_SONG', song)
        this.start = position
        this.overlay = true
        this.show[this.playerType()] = true
        this.$refs[this.playerType()].load()
      START_COUNTDOWN: (guessTime) ->
        this.guessTime = guessTime
        this.loading = false
        setTimeout () =>
          this.$refs.timer.startCountdown()
        , 1
        this.$refs[this.playerType()].play()
      TIME_UP: () ->
        this.$refs.timer.stopCountdown()
        this.overlay = false
      RESET: () ->
        this.$refs.timer.stopCountdown()
        this.loading = false
        this.$refs[this.playerType()].pause()
    methods:
      confirmLoad: () ->
        this.$refs[this.playerType()].setPosition()
        this.$socket.emit('SONG_LOADED')
      playerType: () ->
        if this.$store.state.game.currentSong.src.includes('youtube')
          return 'youtube'
        return 'normal'
      resetVideo: () ->
        for key of this.show
          this.show[key] = false
          this.$refs[key].pause()
</script>


<style scoped>
  .video-container {
    height: 200px;
    text-align: center;
    padding: 10px;
    max-width: 352px;
  }
</style>