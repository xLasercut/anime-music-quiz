<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-autocomplete
        box
        :items="$store.state.game.choices"
        v-model="guess"
      ></v-autocomplete>
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
  .el-autocomplete {
    width: 100%;
  }

  .input-container {
    margin-top: 10px;
  }
</style>