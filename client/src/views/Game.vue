<template>
  <v-container class="main-container" fluid grid-list-md>
    <v-layout wrap>
      <game></game>
      <chat></chat>
    </v-layout>
  </v-container>
</template>

<script lang="coffee">
  import Chat from '../game/Chat.vue'
  import Game from '../game/Game.vue'
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
    beforeRouteLeave: (to, from, next) ->
      if this.$store.state.game.playing
        answer = window.confirm('You are about to leave this page. Continue?')
        if answer
          next()
        else
          next(false)
      else
        next()
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')
</script>

<style scoped>
  .main-container {
    padding: 10px;
  }
</style>