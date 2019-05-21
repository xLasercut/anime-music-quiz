<template>
  <div class="game-container">
    <anime-video></anime-video>
    <guess-input></guess-input>
    <players></players>
  </div>
</template>

<script>
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeVideo from './game/AnimeVideo.vue'

  export default {
    components: {
      GuessInput,
      Players,
      AnimeVideo
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