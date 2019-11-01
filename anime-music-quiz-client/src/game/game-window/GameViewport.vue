<template>
  <v-row>
    <v-col cols="12" sm="3"></v-col>
    <video-window></video-window>
    <song-info></song-info>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SongInfo from './game-viewport/SongInfo.vue'
import VideoWindow from './game-viewport/VideoWindow.vue'

@Component({
  components: { SongInfo, VideoWindow }
})
export default class GameViewport extends Vue {

}
</script>