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
        socket: this.$store.state.game.socket
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_CHOICES', (data) => {
          this.$store.commit('game/UPDATE_CHOICES', data)
        })

        this.socket.on('UPDATE_PLAYERS', (data) => {
          this.$store.commit('game/UPDATE_PLAYERS', data)
          this.$store.commit('game/UPDATE_HOST', this.socket.id)
        })

        this.socket.on('UPDATE_PLAYING', (playing) => {
          this.$store.commit('game/UPDATE_PLAYING', playing)
        })
      }
      else {
        this.$router.push('/')
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