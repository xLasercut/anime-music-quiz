<template>
  <div class="main-container">
    <game></game>
    <chat></chat>
  </div>
</template>

<script>
  import Chat from '../components/Chat.vue'
  import Game from '../components/Game.vue'

  export default {
    components: {
      Chat,
      Game
    },
    data() {
      return {
        socket: this.$store.state.socket
      }
    },
    mounted() {
      if (!this.$store.getters.validState) {
        this.$router.push('/')
      }

      if (this.socket) {
        this.socket.on('REQUEST_PLAYER_DETAILS', () => {
          this.socket.emit('LOGIN', this.$store.getters.playerData)
        })

        this.socket.on('UPDATE_ANIME_LIST', (data) => {
          this.$store.commit('updateAnimeList', data)
        })
      }
    }
  }
</script>

<style scoped>
  .main-container {
    height: 100%;
    width: 100%;
  }
</style>