<template>
  <v-layout wrap>
    <v-flex xs12 sm3></v-flex>
    <video-window :volume="$store.state.game.volume"></video-window>
    <song-information></song-information>
  </v-layout>
</template>

<script lang="coffee">
  import VideoWindow from './anime-information/VideoWindow.vue'
  import SongInformation from './anime-information/SongInformation.vue'

  export default
    components: { VideoWindow, SongInformation }
</script>