<template>
  <v-layout justify-center wrap>
    <player-card
      v-for="(player, key) in $store.state.game.players" :key="`${key}`"
      :player="player"
    ></player-card>
  </v-layout>
</template>

<script lang="coffee">
  import PlayerCard from './players/PlayerCard.vue'

  export default
    components: { PlayerCard }
</script>

<style scoped>
  .player-container {
    margin-top: 10px;
  }
</style>