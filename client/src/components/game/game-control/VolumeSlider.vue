<template>
  <v-list-tile>
    <v-list-tile-action>
      <v-slider prepend-icon="fas fa-volume-down" v-model.number="volume"></v-slider>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
  export default {
    data() {
      return {
        volume: this.$store.state.game.volume
      }
    },
    watch: {
      volume(val) {
        this.$store.commit('game/UPDATE_VOLUME', val)
      }
    }
  }
</script>

<style scoped>
  .slider-container {
    padding-left: 10px;
    padding-right: 20px;
  }
</style>