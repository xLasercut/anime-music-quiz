<template>
  <v-snackbar :timeout="6000" :color="color" top v-model="show" id="game-notification">
    {{text}}
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BannerColor } from '@/assets/types'
import { EventBus } from '@/assets/notification'

@Component({})
export default class GameNotification extends Vue {
  show = false
  color: BannerColor = 'error'
  text = ''

  showNotification(color: BannerColor, text: string): void {
    this.color = color
    this.text = text
    this.show = true
  }

  mounted() {
    EventBus.$on('game-notification', (color: BannerColor, text: string): void => {
      if (this.show) {
        this.show = false
        setTimeout((): void => {
          this.showNotification(color, text)
        })
      }
      else {
        this.showNotification(color, text)
      }
    })
  }
}
</script>