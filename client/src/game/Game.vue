<template>
  <v-col cols="7" sm="8" class="game-container">
    <answer></answer>
    <anime-information></anime-information>
    <guess-input></guess-input>
    <players></players>
    <bet-window></bet-window>
  </v-col>
</template>

<script lang="coffee">
  import Answer from './game/Answer.vue'
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeInformation from './game/AnimeInformation.vue'
  import BetWindow from './game/BetWindow.vue'

  export default
    components: { Answer, GuessInput, Players, AnimeInformation, BetWindow }
</script>

<style scoped>
  .game-container {
    height: calc(100vh - 60px);
    overflow: auto;
  }
</style>