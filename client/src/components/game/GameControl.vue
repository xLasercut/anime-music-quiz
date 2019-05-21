<template>
  <div>
    <el-button v-show="playing" @click="$emit('toggle')">Toggle Answer</el-button>
    <el-button v-show="!playing" @click="start()">Start</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        playing: false,
        socket: this.$store.state.socket
      }
    },
    methods: {
      start() {
        this.socket.emit('START_GAME', 'test')
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', () => {
          this.playing = true
        })

        this.socket.on('TIME_UP', () => {
          this.playing = false
        })
      }
    }
  }
</script>