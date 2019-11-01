<template>
  <v-col cols="12" sm="6">
    <v-row justify="center" no-gutters>
      <v-col class="video-container">
        <normal-video ref="normal" v-model="show.normal" @song-loaded="loaded()" :volume="$store.state.game.volume"></normal-video>
        <youtube-video ref="youtube" v-model="show.youtube" @song-loaded="loaded()" :volume="$store.state.game.volume"></youtube-video>
        <countdown-timer ref="timer" :maxTime="$store.state.game.settings.guessTime"></countdown-timer>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NormalVideo from './video-window/NormalVideo.vue'
import YoutubeVideo from './video-window/YoutubeVideo.vue'
import CountdownTimer from './video-window/CountdownTimer.vue'
import { GameVideo } from '../../../assets/interfaces'
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

  show: GameVideo = {
    normal: false,
    youtube: false
  }

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

  @Socket('NEW_SONG')
  newSong(): void {
    this.resetVideo()
    this.$refs[this.playerType].load()
  }

  @Socket('START_COUNTDOWN')
  startCountdown(): void {
    this.$refs.timer.startCountdown()
    this.$refs[this.playerType].play()
  }

  @Socket('TIME_UP')
  timeUp(): void {
    this.show[this.playerType] = true
  }

  @Socket('RESET')
  reset(): void {
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