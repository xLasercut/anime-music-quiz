<template>
  <div class="player-container">
    <div class="player-card" v-for="(player, key) in players" :key="`${key}`">
      <div class="player-name">
        {{player.username}}
      </div>
      <div class="player-score">
        <span>Score: </span>{{player.score}}
      </div>
    </div>
    <div>
      <el-button @click="$emit('start')">Start</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object
      }
    },
    watch: {
      value(val) {
        this.players = val
      },
      players(val) {
        this.$emit('input', val)
      }
    },
    data() {
      return {
        players: this.value
      }
    }
  }
</script>

<style scoped>
  .player-container {
    padding: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px - 150px - 220px);
    text-align: center;
  }

  .player-card {
    border: 1px solid #E4E7ED;
    width: 200px;
    height: 300px;
    float: left;
    margin: 20px;
  }

  .player-name {
    padding: 10px;
    font-size: 16pt;
    width: calc(100% - 20px);
    background: #E4E7ED;
    float: left;
  }

  .player-score {
    padding: 10px;
    width: calc(100% - 20px);
    float: left;
  }
</style>