<template>
  <v-flex xs12 sm3 class="info-container">
    <v-card elevation="0" :color="$store.getters.color">
      <v-card-title>
        <div class="song-container">
          <div>
            <b>Title</b>
          </div>
          <div>
            {{songInfo('title')}}
          </div>
        </div>
        <div class="song-container">
          <div>
            <b>Artist</b>
          </div>
          <div>
            {{songInfo('artist')}}
          </div>
        </div>
        <div class="song-container">
          <div>
            <b>Type</b>
          </div>
          <div>
            {{songInfo('type')}}
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script lang="coffee">
  export default
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