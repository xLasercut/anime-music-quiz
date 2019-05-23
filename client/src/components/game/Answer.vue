<template>
  <el-row type="flex" justify="center">
    <div class="answer-container">
      <b v-show="this.answer || this.toggle">{{$store.state.anime.source}}</b>
      <b v-show="!this.answer || !this.toggle">?</b>
    </div>
  </el-row>
</template>

<script>
  export default {
    props: {
      toggle: {
        type: Boolean
      }
    },
    data() {
      return {
        answer: false,
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
    background: #E4E7ED;
    font-size: 16pt;
    min-width: 480px;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
  }
</style>