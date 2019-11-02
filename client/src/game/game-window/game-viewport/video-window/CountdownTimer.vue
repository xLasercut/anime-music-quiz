<template>
  <v-col cols="12" align-self="center" class="countdown-container" :style="containerStyle">
    <v-progress-circular
      :rotate="270"
      :size="100"
      :width="15"
      v-model="percentage"
      :color="color"
    >
      {{time}}
    </v-progress-circular>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { BannerColor } from '../../../../assets/types'
import { CountdownHelper } from '../../../../assets/mixins'

@Component({})
export default class CountdownTimer extends Mixins(CountdownHelper) {
  get containerStyle() {
    if (this.show) {
      return {}
    }
    return { position: 'absolute', top: '-200%' }
  }
}
</script>

<style scoped>
  .countdown-container {
    height: 100%;
  }
</style>