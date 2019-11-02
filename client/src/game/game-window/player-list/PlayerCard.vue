<template>
  <v-col cols="auto">
    <v-tooltip v-model="show" :color="player.color" min-width="160" max-width="160" top>
      <template #activator="{ on }">
        <div class="player-card">
          <player-avatar :player="player"></player-avatar>
          <v-row justify="center" no-gutters>
            <v-sheet :class="themeclass('player-name')">
              {{player.username}}
            </v-sheet>
            <v-sheet :class="themeclass('player-score')">
              {{player.score}}
            </v-sheet>
          </v-row>
        </div>
      </template>
      {{guess('anime')}} - {{guess('title')}}
    </v-tooltip>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { PlayerObj } from '../../../assets/interfaces'
import { ThemeHelper } from '../../../assets/mixins'
import PlayerAvatar from './PlayerAvatar.vue'
import { Socket } from 'vue-socket.io-extended'

@Component({
  components: { PlayerAvatar }
})
export default class PlayerCard extends Mixins(ThemeHelper) {
  @Prop() player!: PlayerObj

  show = false

  guess(type: 'title' | 'anime'): string {
    let guess = this.player.guess[type]
    if (!guess) {
      return '...'
    }
    return guess
  }

  @Socket('SHOW_GUESS')
  showGuess(): void {
    this.show = true
    setTimeout(() => {
      this.show = false
    }, 8000)
  }
}
</script>

<style scoped>
  .player-card {
    width: 160px;
    text-align: center;
    margin: 5px;
  }

  .player-name {
    width: 100% ;
    max-width: 150px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 5px;
    word-wrap: break-word;
  }

  .player-score {
    width: 100%;
    max-width: 70px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 0 0 25px 25px;
  }

  .v-tooltip__content {
    word-wrap: break-word;
    font-size: 12pt;
  }
</style>