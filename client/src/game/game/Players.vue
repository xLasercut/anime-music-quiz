<template>
  <v-row justify="center" no-gutters>
    <player-card
      v-for="(player, key) in $store.state.game.players" :key="`${key}`"
      :player="player"
    ></player-card>
  </v-row>
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