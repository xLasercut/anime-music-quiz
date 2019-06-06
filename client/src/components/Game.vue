<template>
  <v-flex xs9>
    <answer></answer>
    <anime-information></anime-information>
    <guess-input></guess-input>
    <players></players>
  </v-flex>
</template>

<script lang="coffee">
  import Answer from './game/Answer.vue'
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeInformation from './game/AnimeInformation.vue'

  export default
    components: { Answer, GuessInput, Players, AnimeInformation }
</script>
