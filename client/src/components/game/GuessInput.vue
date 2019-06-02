<template>
  <v-layout justify-center>
    <v-flex xs5>
      <v-combobox
        box clearable
        :items="$store.state.game.choices.anime"
        label="Anime"
        v-model="guess.anime"
      ></v-combobox>
    </v-flex>
    <v-flex xs5>
      <v-combobox
        box clearable
        :items="$store.state.game.choices.song"
        label="Song"
        v-model="guess.song"
      ></v-combobox>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        guess: {
          anime: '',
          song: ''
        },
        socket: this.$store.state.game.socket
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', () => {
          this.guess.anime = ''
          this.guess.song = ''
        })

        this.socket.on('TIME_UP', () => {
          this.socket.emit('GUESS', this.guess)
        })
      }
    }
  }

</script>

<style scoped>

</style>