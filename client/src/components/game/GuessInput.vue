<template>
  <v-layout justify-center wrap>
    <guess-text :items="$store.state.game.choices.anime" label="Anime" v-model="guess.anime" />
    <guess-text :items="$store.state.game.choices.song" label="Song" v-model="guess.song" />
  </v-layout>
</template>

<script lang="coffee">
  import GuessText from './guess-input/GuessText.vue'

  export default
    components: { GuessText }
    data: () ->
      guess: {
        anime: '',
        song: ''
      }
    sockets:
      NEW_SONG: (_song, _position) ->
        this.guess.song = ''
        this.guess.anime = ''
      TIME_UP: () ->
        this.$socket.emit('GUESS', this.guess)
</script>

<style scoped>

</style>