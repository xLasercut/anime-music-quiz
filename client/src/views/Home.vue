<template>
  <v-container class="main-container" fluid grid-list-md>
    <v-layout wrap>
      <game></game>
      <chat></chat>
    </v-layout>
  </v-container>
</template>

<script lang="coffee">
  import Chat from '../components/Chat.vue'
  import Game from '../components/Game.vue'
  import Notification from '../assets/mixins/notification.coffee'

  export default
    mixins: [ Notification ]
    components: { Chat, Game }
    sockets:
      SYNC_PLAYERS: (players) ->
        data = {
          players: players,
          id: this.$socket.id
        }
        this.$store.commit('game/UPDATE_PLAYERS', data)
      disconnect: () ->
        this.$router.push('/')
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')
</script>

<style scoped>
  .main-container {
    padding: 10px;
  }
</style>