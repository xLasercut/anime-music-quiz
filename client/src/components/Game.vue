<template>
  <v-flex xs7 sm9>
    <answer></answer>
    <anime-information></anime-information>
    <guess-input></guess-input>
    <players></players>
    <bet-window></bet-window>
  </v-flex>
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
