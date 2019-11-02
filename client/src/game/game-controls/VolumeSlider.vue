<template>
  <div class="volume-slider-container">
    <v-slider prepend-icon="mdi-volume-medium" v-model.number="volume" id="game-volume-slider"></v-slider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class VolumeSlider extends Vue {
  get volume(): number {
    return this.$store.state.game.volume
  }

  set volume(val: number) {
    this.$store.commit('UPDATE_VOLUME', val)
  }
}
</script>

<style scoped>
  .volume-slider-container {
    width: 150px;
    padding-top: 15px;
    padding-left: 10px;
  }
</style>