<template>
  <div class="game-container">
    {{players}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        socket: this.$store.state.socket,
        players: {}
      }
    },
    mounted() {
      this.socket.on('UPDATE_PLAYERS_LIST', (data) => {
        this.players = data
      })
    }
  }
</script>

<style scoped>
  .game-container {
    height: 100%;
    width: calc(100% - 420px);
    float: left;
  }
</style>