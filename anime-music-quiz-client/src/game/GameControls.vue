<template>
  <v-toolbar-items>
    <song-select-dialog></song-select-dialog>
    <nav-btn color="success" icon="mdi-play" @click="startGame()" v-if="showPlayBtn" id="game-play-btn"></nav-btn>
    <nav-btn color="error" icon="mdi-stop" @click="stopGame()" v-if="showStopBtn" id="game-stop-btn"></nav-btn>
    <settings-dialog></settings-dialog>
    <volume-slider></volume-slider>
  </v-toolbar-items>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBtn from '../components/buttons/NavBtn.vue'
import SettingsDialog from './game-controls/SettingsDialog.vue'
import VolumeSlider from './game-controls/VolumeSlider.vue'
import SongSelectDialog from './game-controls/SongSelectDialog.vue'

@Component({
  components: { NavBtn, SettingsDialog, VolumeSlider, SongSelectDialog }
})
export default class GameControls extends Vue {
  get showPlayBtn(): boolean {
    return (!this.$store.state.game.gameState.playing && (this.$store.state.game.host || this.$store.state.client.admin))
  }

  get showStopBtn(): boolean {
    return (this.$store.state.game.gameState.playing && (this.$store.state.game.host || this.$store.state.client.admin))
  }

  startGame(): void {
    this.$socket.client.emit('START_GAME')
  }

  stopGame(): void {
    this.$socket.client.emit('STOP_GAME')
  }
}
</script>