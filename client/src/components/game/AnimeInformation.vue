<template>
  <v-layout wrap>
    <v-flex xs4></v-flex>
    <v-flex xs4 class="video-container">
      <video-window :volume="$store.state.game.volume"></video-window>
      <countdown></countdown>
      <loading v-if="loading"></loading>
    </v-flex>
    <v-flex xs1></v-flex>
    <song-information></song-information>
  </v-layout>
</template>

<script lang="coffee">
  import Countdown from './anime-information/Countdown.vue'
  import VideoWindow from './anime-information/VideoWindow.vue'
  import SongInformation from './anime-information/SongInformation.vue'
  import Loading from '../shared/Loading.vue'

  export default
    components: { Countdown, VideoWindow, SongInformation, Loading }
    data: () ->
      loading: false
    sockets:
      NEW_SONG: (_song, _position) ->
        this.loading = true
      START_COUNTDOWN: () ->
        this.loading = false
</script>

<style scoped>
  .info-container {
    margin-top: 10px;
  }

  .video-container {
    height: 200px;
    text-align: center;
  }
</style>