<template>
  <v-col cols="7" sm="8" class="game-window">
    <game-answer></game-answer>
    <game-viewport></game-viewport>
    <guess-input></guess-input>
    <player-list></player-list>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlayerList from './game-window/PlayerList.vue'
import GameAnswer from './game-window/GameAnswer.vue'
import GuessInput from './game-window/GuessInput.vue'
import GameViewport from './game-window/GameViewport.vue'

@Component({
  components: { PlayerList, GameAnswer, GuessInput, GameViewport }
})
export default class GameWindow extends Vue {

}
</script>

<style scoped>
.game-window {
  height: calc(100vh - 85px);
  overflow: auto;
}
</style>