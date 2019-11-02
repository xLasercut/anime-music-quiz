<template>
  <dialog-btn nav icon="mdi-settings" color="info" id="game-settings-btn" v-model="show" width="500" @click="getSettings()"
  >
    <v-row justify="space-between" no-gutters>
      <v-col cols="auto">
        Settings
      </v-col>
      <v-col cols="auto">
        <dialog-close-btn id="settings-cancel-btn" @click="show = false"></dialog-close-btn>
      </v-col>
    </v-row>
    <v-form ref="form">
      <settings-slider label="Song Count" v-model.number="settings.songCount" id="song-count-input" min="1" max="100" :disabled="disabled"></settings-slider>
      <settings-slider label="Guess Time" v-model.number="settings.guessTime" id="guess-time-input" min="1" max="50" :disabled="disabled"></settings-slider>
      <settings-slider label="Song Select Time" v-model.number="settings.selectTime" id="song-select-time-input" min="10" max="30" :disabled="disabled"></settings-slider>
      <settings-radio label="Duplicate" v-model="settings.duplicate" :options="duplicateOptions" id="duplicate" :disabled="disabled"></settings-radio>
      <settings-radio label="Game Mode" v-model="settings.gameMode" :options="gameModeOptions" id="game-mode" :disabled="disabled"></settings-radio>
      <settings-checkbox v-model="settings.users" :disabled="disabled" :items="$store.state.list.users"></settings-checkbox>
    </v-form>
    <v-row justify="center">
      <v-col cols="auto">
        <icon-btn color="success" icon="mdi-check" @click="updateSettings()" id="settings-confirm-btn">Confirm</icon-btn>
      </v-col>
    </v-row>
  </dialog-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DialogBtn from '../../components/buttons/DialogBtn.vue'
import DialogCloseBtn from '../../components/buttons/DialogCloseBtn.vue'
import SettingsSlider from './settings-dialog/SettingsSlider.vue'
import SettingsRadio from './settings-dialog/SettingsRadio.vue'
import { SettingsObj } from '../../assets/interfaces'
import { Socket } from 'vue-socket.io-extended'
import IconBtn from '../../components/buttons/IconBtn.vue'
import SettingsCheckbox from './settings-dialog/SettingsCheckbox.vue'

@Component({
  components: { DialogBtn, DialogCloseBtn, SettingsSlider, SettingsRadio, IconBtn, SettingsCheckbox }
})
export default class SettingsDialog extends Vue {
  show = false

  localSettings: SettingsObj = {
    songCount: 20,
    guessTime: 30,
    selectTime: 20,
    gameMode: 'normal',
    users: [],
    duplicate: false
  }

  gameModeOptions = [
    { label: 'Normal', value: 'normal' },
    { label: 'Selector', value: 'selector' }
  ]

  duplicateOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ]

  getSettings(): void {
    this.$socket.client.emit('GET_GAME_SETTINGS')
  }

  updateSettings(): void {
    this.$socket.client.emit('UPDATE_GAME_SETTINGS', this.settings)
    this.show = false
  }

  get disabled(): boolean {
    return !(this.$store.state.game.host || this.$store.state.client.admin) || this.$store.state.game.gameState.playing
  }

  get settings(): SettingsObj {
    return this.$store.state.game.settings
  }

  set settings(settings: SettingsObj) {
    this.localSettings = settings
  }
}
</script>