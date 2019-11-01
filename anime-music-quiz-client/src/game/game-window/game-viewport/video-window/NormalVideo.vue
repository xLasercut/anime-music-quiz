<template>
  <video ref="player" @loadeddata="$emit('song-loaded')" :style="playerStyle">
    <source :src="$store.state.game.gameState.currentSong.src">
    Your browser does not support video element
  </video>
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import VideoHelper from '../../../../assets/mixins/video-helper'

@Component({})
export default class NormalVideo extends Mixins(VideoHelper) {
  $refs!: {
    player: HTMLVideoElement
  }

  @Watch('volume')
  _onVolumeChange(val: number) {
    this.$refs.player.volume = val / 100
  }

  load(): void {
    this.$refs.player.load()
  }

  setPosition(): void {
    this.duration = this.$refs.player.duration
    this.$refs.player.currentTime = this.getStartPosition()
  }

  play(): void {
    this.$refs.player.play()
  }

  pause(): void {
    this.$refs.player.pause()
  }

  reset(): void {
    this.pause()
  }
}
</script>

<style scoped>
  video {
    max-height: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    border: 2px solid yellow;
  }
</style>