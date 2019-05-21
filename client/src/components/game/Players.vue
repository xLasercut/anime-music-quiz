<template>
  <div class="player-container">
    <div class="player-card" v-for="(player, key) in players" :key="`${key}`">
      <div class="player-name">
        {{player.username}}
      </div>
      <div class="player-avatar">
        <img :src="`img/avatar/${player.avatar}.png`">
      </div>
      <div class="player-score">
        <span>Score: </span>{{player.score}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        players: {},
        socket: this.$store.state.socket
      }
    },
    methods: {
      avatar(file) {
        return "../../assets/avatar/" + `${file}.png`
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_PLAYERS', (data) => {
          this.players = data
        })
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
    width: 150px;
    float: left;
    margin: 20px;
  }

  .player-name {
    padding: 10px;
    font-size: 16pt;
    width: calc(100% - 20px);
    float: left;
  }

  .player-score {
    padding: 10px;
    width: calc(100% - 20px);
    float: left;
  }
</style>