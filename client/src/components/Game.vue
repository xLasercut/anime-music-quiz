<template>
  <div class="game-container">
    <v-container grid-list-lg>
      <game-control v-model="volume"></game-control>
      <answer></answer>
      <anime-information :volume="volume"></anime-information>
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
  import GameControl from './game/GameControl.vue'
  import SettingsPanel from './game/SettingsPanel.vue'

  export default {
    components: {
      Answer,
      GuessInput,
      Players,
      AnimeInformation,
      GameControl,
      SettingsPanel
    },
    data() {
      return {
        volume: 50
      }
    }
  }
</script>

<style scoped>
  .game-container {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 250px);
    height: 100%;
  }
</style>