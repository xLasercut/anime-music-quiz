<template>
  <div class="player-container">
    <el-row type="flex" justify="center">
      <player-card
        v-for="(player, key) in players" :key="`${key}`"
        :name="player.username" :avatar="player.avatar"
        :guess="player.guess" :score="player.score"
      ></player-card>
    </el-row>
  </div>
</template>

<script>
  import PlayerCard from './players/PlayerCard.vue'

  export default {
    components: { PlayerCard },
    data() {
      return {
        players: {},
        socket: this.$store.state.socket
      }
    },
    methods: {
      formatPlayers() {
        var n = 0
        var players = []
        var row = {}
        for (var key in this.players) {
          row[key] = this.players[key]
          n += 1
          if (n >= 5 || Object.keys(this.players).length === n ) {
            players.push(row)
            n = 0
            row = {}
          }
        }
        return players
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
    height: calc(100% - 20px - 150px - 320px);
    text-align: center;
  }

  .el-row {
    margin-top: 40px;
  }
</style>