<template>
  <div class="game-container">
    <v-container fluid grid-list-lg>
      <answer></answer>
      <anime-information></anime-information>
      <guess-input></guess-input>
      <players></players>
    </v-container>
  </div>
</template>

<script>
  import Answer from './game/Answer.vue'
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeInformation from './game/AnimeInformation.vue'
  import SettingsPanel from './game/SettingsPanel.vue'

  export default {
    components: {
      Answer,
      GuessInput,
      Players,
      AnimeInformation,
      SettingsPanel
    }
  }
</script>

<style scoped>
  .game-container {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 400px);
    height: 100%;
  }
</style>