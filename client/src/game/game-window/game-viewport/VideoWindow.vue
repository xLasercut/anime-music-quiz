<template>
  <v-col cols="12" sm="6">
    <v-row justify="center" no-gutters>
      <v-col class="video-container">
        <normal-video ref="normal" v-model="show.normal" @song-loaded="loaded()" :volume="$store.state.game.volume"></normal-video>
        <youtube-video ref="youtube" v-model="show.youtube" @song-loaded="loaded()" :volume="$store.state.game.volume"></youtube-video>
        <countdown-timer ref="timer" :maxTime="$store.state.game.settings.guessTime"></countdown-timer>
        <v-progress-circular indeterminate :size="50" :width="5" color="primary" v-if="loading"></v-progress-circular>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NormalVideo from './video-window/NormalVideo.vue'
import YoutubeVideo from './video-window/YoutubeVideo.vue'
import CountdownTimer from './video-window/CountdownTimer.vue'
import { Socket } from 'vue-socket.io-extended'

@Component({
  components: { NormalVideo, YoutubeVideo, CountdownTimer }
})
export default class VideoWindow extends Vue {
  $refs!: {
    normal: NormalVideo,
    youtube: YoutubeVideo,
    timer: CountdownTimer
    [key: string]: any
  }

  show: { [key: string]: boolean } = {
    normal: false,
    youtube: false
  }

  loading = false

  get playerType(): 'youtube' | 'normal' {
    if (this.$store.state.game.gameState.currentSong.src.includes('youtube')) {
      return 'youtube'
    }
    return 'normal'
  }

  resetVideo(): void {
    for (let key in this.show) {
      this.show[key] = false
      this.$refs[key].pause()
    }
  }

  loaded(): void {
    this.$socket.client.emit('SONG_LOADED')
  }

  @Socket('START_LOAD')
  newSong(): void {
    this.loading = true
    this.resetVideo()
    this.$refs[this.playerType].load()
  }

  @Socket('START_COUNTDOWN')
  startCountdown(): void {
    this.loading = false
    this.$refs.timer.startCountdown()
    this.$refs[this.playerType].play()
  }

  @Socket('TIME_UP')
  timeUp(): void {
    this.$refs.timer.stopCountdown()
    this.show[this.playerType] = true
  }

  @Socket('RESET')
  reset(): void {
    this.loading = false
    for (let key in this.show) {
      this.$refs[key].reset()
    }
    this.$refs.timer.stopCountdown()
  }
}
</script>

<style scoped>
  .video-container {
    height: 200px;
    text-align: center;
    padding: 10px;
    max-width: 352px;
    z-index: 2;
  }
</style>