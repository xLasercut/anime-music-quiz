<template>
  <v-row>
    <v-col xs="12" sm="3"></v-col>
    <video-window :volume="$store.state.game.volume"></video-window>
    <song-information></song-information>
  </v-row>
</template>

<script lang="coffee">
  import VideoWindow from './anime-information/VideoWindow.vue'
  import SongInformation from './anime-information/SongInformation.vue'

  export default
    components: { VideoWindow, SongInformation }
</script>