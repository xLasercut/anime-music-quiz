<template>
  <v-layout fill-height align-center justify-center v-show="show">
    <v-progress-circular
      :rotate="270"
      :size="100"
      :width="15"
      :value="percentage()"
      :color="color()"
    >
      {{ Math.ceil(time / 1000) }}
    </v-progress-circular>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        time: 30000,
        countdown: null,
        socket: this.$store.state.game.socket,
        show: false
      }
    },
    methods: {
      percentage() {
        return 100 * (1 - this.time / (this.$store.state.game.settings.guessTime * 1000))
      },
      color() {
        var percentage = this.percentage()
        if (percentage > 75) {
          return 'error'
        }
        else if (percentage > 50) {
          return 'warning'
        }
        return 'success'
      },
      startCountdown() {
        this.countdown = setInterval(() => {
          this.time -= 200
          if (this.time <= 0) {
            this.stopCountdown()
          }
        }, 200)
      },
      stopCountdown() {
        clearInterval(this.countdown)
        this.show = false
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('START_COUNTDOWN', () => {
          this.time = this.$store.state.game.settings.guessTime * 1000
          this.show = true
          this.startCountdown()
        })

        this.socket.on('TIME_UP', () => {
          this.stopCountdown()
        })

        this.socket.on('RESET', () => {
          this.stopCountdown()
        })
      }
    }
  }
</script>