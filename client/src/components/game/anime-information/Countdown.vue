<template>
  <div v-show="show">
    <span>
      <h1>
        {{Math.floor(time / 1000)}}
      </h1>
    </span>
    <el-progress
      :percentage="percentage()"
      :color="color()"
      :show-text="false"
      :stroke-width="20"
    >
    </el-progress>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time: 30000,
        countdown: null,
        bar: null,
        socket: this.$store.state.socket,
        show: false,
        guessTime: 30000
      }
    },
    methods: {
      percentage() {
        return 100 * (1 - this.time / this.guessTime)
      },
      color() {
        var percentage = this.percentage()
        if (percentage > 75) {
          return '#F56C6C'
        }
        else if (percentage > 50) {
          return '#E6A23C'
        }
        return '#67C23A'
      },
      startCountdown() {
        this.countdown = setInterval(() => {
          this.time -= 100
          if (this.time <= 0) {
            this.stopCountdown()
          }
        }, 100)
      },
      stopCountdown() {
        clearInterval(this.countdown)
        this.show = false
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('START_COUNTDOWN', (time) => {
          this.time = time * 1000
          this.guessTime = time * 1000
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