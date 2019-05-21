<template>
  <div class="input-container">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-autocomplete
          :fetch-suggestions="querySearch"
          v-model="guess"
        ></el-autocomplete>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        guess: '',
        socket: this.$store.state.socket
      }
    },
    methods: {
      querySearch(string, callback) {
        var results = this.$store.state.animeList.filter((item) => {
          if (item.value.toLowerCase().includes(string.toLowerCase())) {
            return item
          }
        })
        callback(results)
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (_data) => {
          this.guess = ''
        })

        this.socket.on('TIME_UP', () => {
          this.socket.emit('GUESS', this.guess)
        })
      }
    }
  }

</script>

<style scoped>
  .el-autocomplete {
    width: 100%;
  }

  .input-container {
    width: 100%;
    height: 100px;
    padding-top: 50px;
  }
</style>