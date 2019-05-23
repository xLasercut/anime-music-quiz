<template>
  <div v-show="show">
    <span>
      <h1>
        {{time}}
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
        time: 30,
        countdown: null,
        socket: this.$store.state.socket,
        show: false,
        guessTime: 30
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
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('START_COUNTDOWN', (time) => {
          this.time = time
          this.guessTime = time
          this.show = true
          this.countdown = setInterval(() => {
            this.time -= 1
            if (this.time <= 0) {
              clearInterval(this.countdown)
              this.show = false
            }
          }, 1000)
        })

        this.socket.on('TIME_UP', () => {
          clearInterval(this.countdown)
          this.show = false
        })
      }
    }
  }
</script>