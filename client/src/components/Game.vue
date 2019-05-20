<template>
  <div class="game-container">
    <div>

    </div>
    <guess-input></guess-input>
    <div>
      {{players}}
    </div>
  </div>
</template>

<script>
  import GuessInput from './game/GuessInput.vue'

  export default {
    components: { GuessInput },
    data() {
      return {
        socket: this.$store.state.socket,
        players: {},
      }
    },
    mounted() {
      this.socket.on('UPDATE_PLAYERS_LIST', (data) => {
        this.players = data
      })

      this.socket.on('UPDATE_ANIME_LIST', (data) => {
        console.log(data)
        this.$store.commit('updateAnimeList', data)
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