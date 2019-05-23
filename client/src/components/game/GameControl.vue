<template>
  <el-row>
    <el-col :span="12" class="game-controls">
      <el-button-group>
        <el-button v-if="!playing" @click="start()">Start</el-button>
        <el-button v-if="playing" @click="lobby()">Back to Lobby</el-button>
        <el-button v-if="playing" @click="$emit('toggle')">Toggle Answer</el-button>
      </el-button-group>
    </el-col>
    <el-col :span="12" class="setting-controls">
      <el-button :disabled="playing" type="info" icon="el-icon-setting" @click="$emit('settings')"></el-button>
    </el-col>
  </el-row>
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
        this.socket.emit('START_GAME')
      },
      lobby() {
        this.socket.emit('LOBBY')
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_PLAYING', (playing) => {
          this.playing = playing
        })
      }
    }
  }
</script>

<style scoped>
  .setting-controls {
    text-align: right;
  }

  .game-controls {
    text-align: left;
  }
</style>