<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row justify="center" align="start" no-gutters>
        <v-col cols="5" sm="3" md="2">
          <v-sheet class="song-num-container" :color="theme" id="game-song-count">
            {{currentSong}} / {{maxSong}}
          </v-sheet>
        </v-col>
      </v-row>
      <v-row justify="center" align="start" no-gutters>
        <v-col cols="12" sm="8" md="6" lg="5">
          <v-sheet class="answer-container" :color="theme">
            <b id="song-anime">{{answer()}}</b>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
    computed:
      theme: () ->
        if this.$vuetify.theme.dark
          return 'rgb(33, 33, 33)'
        return 'rgb(224, 224, 224)'
</script>

<style scoped>
  .song-num-container {
    border-radius: 30px 30px 0 0;
    padding: 2px;
    background: #E4E7ED;
    text-align: center;
  }

  .answer-container {
    background: #E4E7ED;
    font-size: 16pt;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
  }
</style>