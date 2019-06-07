<template>
  <v-layout>
    <v-flex xs12>
      <v-layout justify-center>
        <v-flex xs5 sm3 md2 class="text-xs-center">
          <v-sheet class="song-num-container" :color="$store.getters.color">
            {{currentSong}} / {{maxSong}}
          </v-sheet>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex xs12 sm8 md6 lg5 class="text-xs-center">
          <v-sheet class="answer-container" :color="$store.getters.color">
            <b>{{answer()}}</b>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-flex>
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
    border-radius: 30px 30px 0 0;
    padding: 2px;
    background: #E4E7ED;
  }

  .answer-container {
    background: #E4E7ED;
    font-size: 16pt;
    padding: 5px;
    border-radius: 5px;
  }
</style>