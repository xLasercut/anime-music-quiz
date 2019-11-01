<template>
  <v-row justify="center">
    <guess-input-field
      label="Anime" :items="$store.state.game.choices.anime"
      v-model.trim="guess.anime" :disabled="disabled" id="anime-guess"
    ></guess-input-field>
    <guess-input-field
      label="Title" :items="$store.state.game.choices.title"
      v-model.trim="guess.title" :disabled="disabled" id="title-guess"
      :append-outer-icon="icon" @click:append-outer="skipSong()"
    ></guess-input-field>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PlayerGuess } from '../../assets/interfaces'
import GuessInputField from './guess-input/GuessInputField.vue'
import { Socket } from 'vue-socket.io-extended'

@Component({
  components: { GuessInputField }
})
export default class GuessInput extends Vue {
  guess: PlayerGuess = {
    title: '',
    anime: ''
  }

  locked = true

  get icon(): string {
    if (!this.locked && this.$store.state.game.gameState.playing) {
      return 'mdi-lock'
    }
    return ''
  }

  get disabled(): boolean {
    return (this.locked || !this.$store.state.game.gameState.playing || this.$store.state.game.selector)
  }

  @Socket('NEW_SONG')
  newSong(): void {
    this.guess.title = ''
    this.guess.anime = ''
  }

  @Socket('START_COUNTDOWN')
  startCountdown(): void {
    this.locked = false
  }

  @Socket('TIME_UP')
  timeUp(): void {
    this.locked = true
    this.$socket.client.emit('GUESS', this.guess)
  }
}
</script>