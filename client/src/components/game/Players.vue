<template>
  <v-layout>
    <v-flex xs12>
      <v-layout
        justify-center
        v-for="(row, index) in $store.getters['game/players']"
        :key="`row_${index}`"
        class="player-container"
      >
        <player-card
          v-for="(player, key) in row" :key="`${key}`"
          :player="player"
        ></player-card>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import PlayerCard from './players/PlayerCard.vue'

  export default {
    components: { PlayerCard }
  }
</script>

<style scoped>
  .player-container {
    margin-top: 10px;
  }
</style>