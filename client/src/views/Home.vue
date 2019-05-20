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
        this.socket.on('PLAYER_DETAILS', () => {
          this.socket.emit('LOGIN', this.$store.state.username)
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