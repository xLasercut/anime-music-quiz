<template>
  <el-row>
    <el-col :span="12" class="game-controls">
      <el-button-group>
        <el-button type="primary" icon="el-icon-back" @click="$router.push('/')">Home</el-button>
        <el-button v-if="showStartButton" @click="start()" type="success" icon="el-icon-video-play">
          Start
        </el-button>
        <el-button v-if="showLobbyButton" @click="lobby()" type="danger" icon="el-icon-video-pause">
          Stop
        </el-button>
        <el-button v-if="$store.state.game.playing" @click="$emit('toggle')" type="primary" icon="el-icon-info">
          Toggle Answer
        </el-button>
      </el-button-group>
    </el-col>
    <el-col :span="12">
      <el-row type="flex" justify="end">
        <div class="volume-slider">
          <el-slider v-model.number="volume"></el-slider>
        </div>
        <el-button-group>
          <el-button
            :disabled="$store.state.game.playing"
            type="info" icon="el-icon-setting"
            @click="$emit('settings')"
          ></el-button>
        </el-button-group>
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
        socket: this.$store.state.game.socket,
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
    computed: {
      showStartButton() {
        return (!this.$store.state.game.playing && this.$store.state.game.host)
      },
      showLobbyButton() {
        return (this.$store.state.game.playing && this.$store.state.game.host)
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
          this.$store.commit('game/UPDATE_PLAYING', playing)
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