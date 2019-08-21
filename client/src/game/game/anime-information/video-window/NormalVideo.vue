<template>
  <video ref="player" @loadeddata="$emit('loaded')">
    <source :src="$store.state.game.currentSong.src" v-if="$store.state.game.currentSong.src">
    Your browser does not support video element
  </video>
</template>

<script lang="coffee">
  export default
    props: [ 'start', 'volume' ]
    watch:
      volume: (val) ->
        this.$refs.player.volume = val / 100
    methods:
      getStartPosition: () ->
        maxStart = Math.floor(this.$refs.player.duration - this.$store.state.game.settings.guessTime)
        if maxStart > 0
          return Math.floor(this.start * maxStart)
        return 0
      load: () ->
        this.$refs.player.load()
      setPosition: () ->
        this.$refs.player.currentTime = this.getStartPosition()
      play: () ->
        this.$refs.player.play()
      pause: () ->
        this.$refs.player.pause()
</script>

<style scoped>
  video {
    max-height: 95%;
    max-width: 95%;
    margin: 0;
    padding: 0;
  }
</style>