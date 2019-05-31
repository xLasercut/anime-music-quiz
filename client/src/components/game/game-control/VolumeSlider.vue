<template>
  <div class="slider-container">
    <v-slider prepend-icon="fas fa-volume-down" v-model.number="volume"></v-slider>
  </div>
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
    width: 120px;
    padding-top: 15px;
    padding-left: 10px;
  }
</style>