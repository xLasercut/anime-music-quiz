<template>
  <div class="slider-container">
    <v-slider prepend-icon="mdi-volume-medium" v-model.number="volume" id="game-volume-slider"></v-slider>
  </div>
</template>

<script lang="coffee">
  export default
    data: () ->
      volume: this.$store.state.game.volume
    watch:
      volume: (val) ->
        this.$store.commit('game/UPDATE_VOLUME', val)
</script>

<style scoped>
  .slider-container {
    width: 100px;
    padding-top: 15px;
    padding-left: 10px;
  }
</style>