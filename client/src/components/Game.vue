<template>
  <div class="game-container">
    <anime-video :toggle="toggle"></anime-video>
    <guess-input></guess-input>
    <game-control @toggle="toggleAnswer()"></game-control>
    <players></players>
  </div>
</template>

<script>
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeVideo from './game/AnimeVideo.vue'
  import GameControl from './game/GameControl.vue'

  export default {
    components: {
      GuessInput,
      Players,
      AnimeVideo,
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

<style scoped>
  .game-container {
    height: 100%;
    width: calc(100% - 420px);
    float: left;
  }
</style>