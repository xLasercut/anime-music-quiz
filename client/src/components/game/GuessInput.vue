<template>
  <v-layout justify-center wrap>
    <guess-text :items="$store.state.game.choices.anime" label="Anime" v-model="guess.anime" :disabled="locked" />
    <guess-text :items="$store.state.game.choices.song" label="Song" v-model="guess.song" :disabled="locked" :icon="icon()" @click:append-outer="skipSong()"/>
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
      locked: true
    sockets:
      NEW_SONG: (_song, _position) ->
        this.guess.song = ''
        this.guess.anime = ''
      START_COUNTDOWN: () ->
        this.locked = false
      TIME_UP: () ->
        if this.locked
          this.$socket.emit('PLAYER_READY')
        else
          this.$socket.emit('GUESS', this.guess)
        this.locked = true
    methods:
      skipSong: () ->
        this.$socket.emit('GUESS', this.guess)
        this.locked = true
      icon: () ->
        if !this.locked and this.$store.state.game.playing
          return 'mdi-lock'
        return ''
</script>

<style scoped>

</style>