<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row justify="center" align="start" no-gutters>
        <v-col cols="5" sm="3" md="2">
          <v-sheet :class="themeClass('song-num-container')" id="game-song-count">
            {{currentSong}} / {{maxSong}}
          </v-sheet>
        </v-col>
      </v-row>
      <v-row justify="center" align="start" no-gutters>
        <v-col cols="12" sm="8" md="6" lg="5">
          <v-sheet tile :class="themeClass('answer-container')">
            <b id="song-anime">{{answer()}}</b>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import ThemeHelper from '../../assets/mixins/theme-helper.coffee'

  export default
    mixins: [ ThemeHelper ]
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
    border-radius: 20px 20px 0 0;
    background: #E4E7ED;
    text-align: center;
    z-index: 3;
  }

  .answer-container {
    background: #E4E7ED;
    font-size: 16pt;
    text-align: center;
    z-index: 3;
  }
</style>