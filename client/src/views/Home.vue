<template>
  <v-container fluid grid-list-md>
    <v-layout wrap class="main-container">
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
      KICKED: () ->
        this.notifyError('You have been kicked')
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')
</script>

<style scoped>
  .main-container {
    height: 100%;
  }
</style>