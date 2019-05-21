<template>
  <el-row class="answer-container" v-if="answer || toggle">
    <h1>{{name}}</h1>
  </el-row>
</template>

<script>
  export default {
    props: {
      name: {
        type: String
      },
      toggle: {
        type: Boolean
      }
    },
    data() {
      return {
        answer: true,
        socket: this.$store.state.socket
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (_data) => {
          this.answer = false
        })

        this.socket.on('TIME_UP', () => {
          this.answer = true
        })
      }
    }
  }
</script>

<style scoped>
  .answer-container {

  }
</style>