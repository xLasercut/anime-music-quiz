<template>
  <el-row>
    <el-col :span="12" class="game-controls">
      <el-button-group>
        <el-button v-if="!playing" @click="start()">Start</el-button>
        <el-button v-if="playing" @click="lobby()">Back to Lobby</el-button>
        <el-button v-if="playing" @click="$emit('toggle')">Toggle Answer</el-button>
      </el-button-group>
    </el-col>
    <el-col :span="12">
      <el-row type="flex" justify="end">
        <div class="volume-slider">
          <el-slider v-model.number="volume"></el-slider>
        </div>
        <el-button :disabled="playing" type="info" icon="el-icon-setting" @click="$emit('settings')"></el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number
      }
    },
    data() {
      return {
        playing: false,
        socket: this.$store.state.socket,
        volume: this.value
      }
    },
    watch: {
      value(val) {
        this.volume = val
      },
      volume(val) {
        this.$emit('input', val)
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


  .game-controls {
    text-align: left;
  }

  .volume-slider {
    margin: 0 20px 0 10px;
    width: 100px;
  }
</style>