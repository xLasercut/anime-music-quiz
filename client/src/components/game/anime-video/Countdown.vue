<template>
  <el-row class="timer-container" type="flex" justify="center" v-if="showTimer">
    <el-col :span="12">
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
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        time: 30,
        countdown: null,
        socket: this.$store.state.socket,
        showTimer: false
      }
    },
    methods: {
      percentage() {
        return 100 * (1 - this.time / 30)
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
        this.socket.on('START_COUNTDOWN', () => {
          this.time = 30
          this.showTimer = true
          this.countdown = setInterval(() => {
            this.time -= 1
            if (this.time <= 0) {
              clearInterval(this.countdown)
              this.showTimer = false
            }
          }, 1000)
        })
      }
    }
  }
</script>

<style scoped>
  .timer-container {
    height: 200px;
    line-height: 100px;
  }

</style>