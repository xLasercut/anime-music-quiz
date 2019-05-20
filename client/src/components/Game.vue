<template>
  <div class="game-container">
    google
  </div>
</template>

<script>
  export default {
    data() {
      return {
        socket: this.$store.state.socket,
        players: []
      }
    },
    mounted() {

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