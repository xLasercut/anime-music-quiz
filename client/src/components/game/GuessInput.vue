<template>
  <v-layout justify-center wrap>
    <v-flex xs12 sm6 md5>
      <v-combobox
        box clearable
        :items="$store.state.game.choices.anime"
        label="Anime"
        v-model="guess.anime"
        clear-icon="far fa-times-circle"
      ></v-combobox>
    </v-flex>
    <v-flex xs12 sm6 md5>
      <v-combobox
        box clearable
        :items="$store.state.game.choices.song"
        label="Song"
        v-model="guess.song"
        clear-icon="far fa-times-circle"
      ></v-combobox>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  export default
    data: () ->
      guess: {
        anime: '',
        song: ''
      },
      socket: this.$store.state.game.socket
    sockets:
      NEW_SONG: (_song, _position) ->
        this.guess.song = ''
        this.guess.anime = ''
      TIME_UP: () ->
        this.$socket.emit('GUESS', this.guess)
</script>

<style scoped>

</style>