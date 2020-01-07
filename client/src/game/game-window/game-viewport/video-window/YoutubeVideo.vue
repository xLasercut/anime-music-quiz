<template>
  <youtube
    @ready="ready($event)" :video-id="videoId" :player-vars="playerVars" class="youtube-video"
    player-width="100%" player-height="100%" :style="playerStyle"
  ></youtube>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { getIdFromURL } from 'vue-youtube-embed'
import VideoHelper from '../../../../assets/mixins/video-helper'

@Component({})
export default class YoutubeVideo extends Mixins(VideoHelper) {
  playerVars = {
    fs: 0,
    controls: 0,
    disablekb: 1,
    modestbranding: 1,
    playsinline: 1
  }

  player: any = null

  timeout: any = null

  loading = false

  @Watch('volume')
  onVolumeChange(val: number) {
    this.player.setVolume(val)
  }

  ready(event: any): void {
    this.player = event.target
  }

  get videoId() {
    return getIdFromURL(this.$store.state.game.gameState.currentSong.src)
  }

  load(): void {
    this.timeout = setInterval(() => {
      this._startLoad()
      this.duration = this.player.getDuration()
      if (this.duration != 0) {
        this._endLoad()
        this.$emit('song-loaded')
      }
    }, 500)
  }

  play(): void {
    this._endLoad()
    this.player.playVideo()
  }

  pause(): void {
    if (this.player) {
      this.player.pauseVideo()
    }
  }

  _startLoad(): void {
    if (!this.loading) {
      this.player.mute()
      this.player.playVideo()
      this.loading = true
    }
  }

  _endLoad(): void {
    this.player.seekTo(this.getStartPosition(), true)
    this.pause()
    this.player.unMute()
    this.loading = false
    clearInterval(this.timeout)
  }

  reset(): void {
    this._endLoad()
  }
}
</script>

<style scoped>
  .youtube-video {
    height: 100%;
  }
</style>
