<template>
  <v-container fluid grid-list-md>
    <v-layout wrap class="main-container">
      <game></game>
      <chat></chat>
    </v-layout>
  </v-container>
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
        this.socket.on('SYNC_PLAYERS', (data) => {
          this.$store.commit('game/SYNC_PLAYERS', data)
        })

        this.socket.on('SYNC_PLAYING', (playing) => {
          this.$store.commit('game/SYNC_PLAYING', playing)
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
  }
</style>