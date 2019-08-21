<template>
  <v-col cols="12" sm="3" class="info-container">
    <v-card elevation="0" :class="themeClass()">
      <v-card-text>
        <div class="song-container">
          <div>
            <b>Title</b>
          </div>
          <div id="song-title">
            {{songInfo('title')}}
          </div>
        </div>
        <div class="song-container">
          <div>
            <b>Artist</b>
          </div>
          <div id="song-artist">
            {{songInfo('artist')}}
          </div>
        </div>
        <div class="song-container">
          <div>
            <b>Type</b>
          </div>
          <div id="song-type">
            {{songInfo('type')}}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="coffee">
  import ThemeHelper from '../../../assets/mixins/theme-helper.coffee'

  export default
    mixins: [ ThemeHelper ]
    data: () ->
      show: false
    sockets:
      NEW_SONG: (_song, _positiong) ->
        this.show = false
      TIME_UP: () ->
        this.show = true
    methods:
      songInfo: (key) ->
        if this.show
          if this.$store.state.game.currentSong[key]
            return this.$store.state.game.currentSong[key]
          return '...'
        return '?'
</script>

<style scoped>
  .info-container {
    max-width: 300px;
  }

  .song-container {
    width: 100%;
    text-align: center;
  }

  .song-information {
    text-align: center;
    background: #E4E7ED;
  }
</style>