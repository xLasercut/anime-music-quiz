<template>
  <v-col cols="7" sm="8" class="game-container">
    <answer></answer>
    <anime-information></anime-information>
    <guess-input></guess-input>
    <players></players>
  </v-col>
</template>

<script lang="coffee">
  import Answer from './game/Answer.vue'
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeInformation from './game/AnimeInformation.vue'

  export default
    components: { Answer, GuessInput, Players, AnimeInformation }
</script>

<style scoped>
  .game-container {
    height: calc(100vh - 119px);
    overflow: auto;
  }
</style>