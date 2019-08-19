<template>
  <v-col cols="12" sm="6">
    <v-row justify="center">
      <v-col cols="12" class="video-container">
        <youtube-video ref="youtube" @loaded="confirmLoad()" :volume="volume" :start="start" v-show="show.youtube">
        </youtube-video>
        <normal-video ref="normal" @loaded="confirmLoad()" :volume="volume" :start="start" v-show="show.normal">
        </normal-video>
        <countdown></countdown>
        <loading v-if="loading"></loading>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="coffee">
  import YoutubeVideo from './video-window/YoutubeVideo.vue'
  import NormalVideo from './video-window/NormalVideo.vue'
  import Countdown from './video-window/Countdown.vue'
  import Loading from '../../../components/Loading.vue'

  export default
    components: { YoutubeVideo, NormalVideo, Countdown, Loading }
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
      loading: false
    sockets:
      NEW_SONG: (song, position) ->
        this.loading = true
        this.resetVideo()
        this.$store.commit('game/UPDATE_CURRENT_SONG', song)
        this.start = position
        this.$refs[this.playerType()].load()
      START_COUNTDOWN: () ->
        this.loading = false
        this.$refs[this.playerType()].play()
      TIME_UP: () ->
        this.show[this.playerType()] = true
      RESET: () ->
        this.$refs[this.playerType()].pause()
      PLACE_BET: () ->
        this.$refs[this.playerType()].pause()
        this.show[this.playerType()] = false
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