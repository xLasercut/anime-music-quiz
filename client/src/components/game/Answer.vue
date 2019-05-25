<template>
  <el-row type="flex" justify="center" class="container">
    <el-col :span="10">
      <el-row type="flex" justify="center">
        <div class="song-num-container">
          {{currentSong}} / {{maxSong}}
        </div>
      </el-row>
      <div class="answer-container">
        <b>{{answer()}}</b>
      </div>
    </el-col>
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
        show: false,
        socket: this.$store.state.socket,
        currentSong: 0,
        maxSong: 0
      }
    },
    methods: {
      answer() {
        if (this.show || this.toggle) {
          return this.$store.state.anime.name
        }
        return '?'
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (_data) => {
          this.show = false
        })

        this.socket.on('TIME_UP', () => {
          this.show = true
        })

        this.socket.on('UPDATE_SONG_NUMBER', (numbers) => {
          this.currentSong = numbers.current
          this.maxSong = numbers.max
        })
      }
    }
  }
</script>

<style scoped>
  .song-num-container {
    border-radius: 50px 50px 0 0;
    padding-top: 10px;
    width: 100px;
    background: #E4E7ED;
  }

  .answer-container {
    background: #E4E7ED;
    font-size: 16pt;
    padding: 10px;
    border-radius: 5px;
  }
</style>