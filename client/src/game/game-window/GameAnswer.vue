<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters justify="center">
        <v-col cols="5" sm="3" md="2">
          <v-sheet :class="themeclass('song-count-container')" id="game-song-count">
            {{ $store.state.game.gameState.currentSongCount }} / {{ $store.state.game.gameState.maxSongCount }}
          </v-sheet>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="12" sm="8" md="6" lg="5">
          <v-sheet :class="themeclass('answer-container')">
            <b id="song-anime">{{answer()}}</b>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ThemeHelper } from '../../assets/mixins'

@Component({})
export default class GameAnswer extends Mixins(ThemeHelper) {
  show = false

  answer(): string {
    if (this.show) {
      return this.$store.state.game.gameState.currentSong.anime[0]
    }
    return '?'
  }
}
</script>

<style scoped>
  .song-count-container {
    border-radius: 20px 20px 0 0;
    text-align: center;
    z-index: 3;
  }

  .answer-container {
    font-size: 16pt;
    text-align: center;
    z-index: 3;
    border-radius: 5px;
  }
</style>