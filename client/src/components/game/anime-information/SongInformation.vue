<template>
  <el-col :span="8">
    <el-card class="song-information" shadow="never" v-show="show">
      <el-row
        v-for="(value, key) in $store.getters.songInformation"
        :key="`song_info_${key}`"
      >
        <el-row>
          <b>{{key}}</b>
        </el-row>
        <el-row>
          {{value}}
        </el-row>
      </el-row>
    </el-card>
  </el-col>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        socket: this.$store.state.socket
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
      }
    }
  }
</script>

<style scoped>
  .el-col {
    padding-left: 80px;
  }

  .song-information {
    background: #E4E7ED;
  }
</style>