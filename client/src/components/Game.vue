<template>
  <el-main class="game-container">
    <answer :toggle="toggle"></answer>
    <anime-information :toggle="toggle"></anime-information>
    <guess-input></guess-input>
    <players></players>
    <game-control @toggle="toggleAnswer()"></game-control>
  </el-main>
</template>

<script>
  import Answer from './game/Answer.vue'
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeInformation from './game/AnimeInformation.vue'
  import GameControl from './game/GameControl.vue'

  export default {
    components: {
      Answer,
      GuessInput,
      Players,
      AnimeInformation,
      GameControl
    },
    data() {
      return {
        toggle: false
      }
    },
    methods: {
      toggleAnswer() {
        this.toggle = !this.toggle
      }
    }
  }
</script>
