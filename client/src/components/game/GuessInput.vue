<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-combobox
        box clearable
        :items="$store.state.game.choices"
        v-model="guess"
      ></v-combobox>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        guess: '',
        socket: this.$store.state.game.socket
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (_song, _start, _guessTime) => {
          this.guess = ''
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