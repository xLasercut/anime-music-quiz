<template>
  <el-row>
    <el-row
      type="flex" justify="center"
      v-for="(row, index) in $store.getters.players"
      :key="`row_${index}`"
      class="player-container"
    >
      <player-card
        v-for="(player, key) in row" :key="`${key}`"
        :player="player"
      ></player-card>
    </el-row>
  </el-row>
</template>

<script>
  import PlayerCard from './players/PlayerCard.vue'

  export default {
    components: { PlayerCard },
    data() {
      return {
        socket: this.$store.state.socket
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_PLAYERS', (data) => {
          this.$store.commit('UPDATE_PLAYERS', data)
        })
      }
    }
  }
</script>

<style scoped>
  .player-container {
    margin-top: 10px;
  }
</style>