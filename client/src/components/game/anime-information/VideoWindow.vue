<template>
  <video ref="player" @loadeddata="confirmLoad()" v-show="show">
    <source :src="$store.state.game.currentSong.src" v-if="$store.state.game.currentSong.src">
    Your browser does not support video element
  </video>
</template>

<script lang="coffee">
  export default
    props:
      volume: {
        type: Number
      }
    watch:
      volume: (val) ->
        this.$refs.player.volume = val / 100
    data: () ->
      show: false,
      start: 0
    sockets:
      NEW_SONG: (song, position) ->
        this.show = false
        this.$store.commit('game/UPDATE_CURRENT_SONG', song)
        this.start = position
        this.$refs.player.load()
      START_COUNTDOWN: () ->
        this.$refs.player.play()
      TIME_UP: () ->
        this.show = true
      RESET: () ->
        this.$refs.player.pause()
    methods:
      confirmLoad: () ->
        this.$refs.player.currentTime = this.getStartPosition()
        this.$socket.emit('SONG_LOADED')
      getStartPosition: () ->
        position = 0
        maxStart = Math.floor(this.$refs.player.duration - this.$store.state.game.settings.guessTime)
        if maxStart > 0
          position = Math.floor(this.start * maxStart)
        return position
</script>


<style scoped>
  video {
    max-width: 100%;
    max-height: 100%;
  }
</style>