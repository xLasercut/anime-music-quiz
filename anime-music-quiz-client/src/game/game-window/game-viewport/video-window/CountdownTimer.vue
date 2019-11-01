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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BannerColor } from '../../../../assets/types'

@Component({})
export default class CountdownTimer extends Vue {
  time = 0

  countdown: any = null

  show = false

  get percentage(): number {
    return 100 * (1 - this.time / this.$store.state.game.settings.guessTime)
  }

  get color(): BannerColor {
    let percentage = this.percentage
    if (percentage > 75) {
      return 'error'
    }
    else if (percentage > 50) {
      return 'warning'
    }
    return 'success'
  }

  get containerStyle() {
    if (this.show) {
      return {}
    }
    return { position: 'absolute', top: '-200%' }
  }

  startCountdown(): void {
    this.show = true
    this.time = this.$store.state.game.settings.guessTime
    this.countdown = setInterval(() => {
      this.time -= 1
      if (this.time <= 0) {
        this.stopCountdown()
      }
    }, 1000)
  }

  stopCountdown(): void {
    this.show = false
    clearInterval(this.countdown)
  }
}
</script>

<style scoped>
  .countdown-container {
    height: 100%;
  }
</style>