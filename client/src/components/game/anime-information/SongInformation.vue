<template>
  <song-card v-show="show">
    <v-card-title>
      <div v-for="(value, key) in $store.getters['game/songInformation']"
      :key="`song_info_${key}`" class="song-container">
        <div>
          <b>{{key}}</b>
        </div>
        <div>
          {{value}}
        </div>
      </div>
    </v-card-title>
  </song-card>
</template>

<script lang="coffee">
  import SongCard from './SongCard.vue'

  export default
    components: { SongCard }
    data: () ->
      show: false
    sockets:
      NEW_SONG: (_song, _positiong) ->
        this.show = false
      TIME_UP: () ->
        this.show = true
</script>

<style scoped>
  .song-container {
    width: 100%;
    text-align: center;
  }

  .song-information {
    text-align: center;
    background: #E4E7ED;
  }
</style>