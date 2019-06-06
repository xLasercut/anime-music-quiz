<template>
  <v-layout column align-center class="text-xs-center">
    <v-sheet class="song-num-container" :color="$store.getters.color">
      {{currentSong}} / {{maxSong}}
    </v-sheet>
    <v-sheet class="answer-container" :color="$store.getters.color">
      <b>{{answer()}}</b>
    </v-sheet>
  </v-layout>
</template>

<script lang="coffee">
  export default
    data: () ->
      show: false,
      currentSong: 0,
      maxSong: 0
    sockets:
      NEW_SONG: (_song, _position) ->
        this.show = false
      SYNC_SONG_COUNT: (numbers) ->
        this.currentSong = numbers.current
        this.maxSong = numbers.max
      TIME_UP: () ->
        this.show = true
    methods:
      answer: () ->
        if this.show
          return this.$store.state.game.currentSong.name

        return '?'
</script>

<style scoped>
  .song-num-container {
    border-radius: 50px 50px 0 0;
    padding-top: 5px;
    width: 100px;
    background: #E4E7ED;
  }

  .answer-container {
    min-width: 400px;
    background: #E4E7ED;
    font-size: 16pt;
    padding: 5px;
    border-radius: 5px;
  }
</style>