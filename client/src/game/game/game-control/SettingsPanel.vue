<template>
  <nav-dialog
    icon="mdi-settings" id="game-settings-btn"
    @click="syncSettings()" color="info" v-model="show" width="500"
  >
    <v-row justify="center" no-gutters>
      <v-col cols="auto">
        Settings
      </v-col>
    </v-row>
    <v-form>
      <settings-slider
        label="Song Number"
        v-model.number="settings.songCount"
        min="1" max="100" :disabled="disabled"
        id="song-count-input"
      ></settings-slider>
      <settings-slider
        label="Guess Time"
        v-model.number="settings.guessTime"
        min="1" max="50" :disabled="disabled"
        id="guess-time-input"
      ></settings-slider>
      <settings-slider
        label="Song Select Time" v-model.number="settings.selectTime"
        min="10" max="30" :disabled="disabled"
        id="song-select-time-input"
      ></settings-slider>
      <settings-radio
        v-model="settings.duplicate" :disabled="disabled"
        label="Duplicate" :options="songDuplicate"
        id="duplicate"
      ></settings-radio>
      <settings-radio
        v-model="settings.mode" :disabled="disabled"
        label="Game Mode" :options="gameModes"
        id="game-mode"
      ></settings-radio>
      <settings-checkbox
        :disabled="disabled" v-model="settings.lists"
        :items="$store.state.list.userListFiles"
      ></settings-checkbox>
      <v-row justify="center">
        <v-col cols="auto">
          <icon-btn
            color="error" icon="mdi-close" @click="show = false"
            id="settings-cancel-btn"
          >Cancel</icon-btn>
        </v-col>
        <v-col cols="auto">
          <icon-btn
            color="success" icon="mdi-check" @click="updateSettings()"
            :disabled="disabled" id="settings-confirm-btn"
          >
            Confirm
          </icon-btn>
        </v-col>
      </v-row>
    </v-form>
  </nav-dialog>
</template>

<script lang="coffee">
  import IconBtn from '../../../components/buttons/IconBtn.vue'
  import SettingsSlider from './settings/SettingsSlider.vue'
  import SettingsCheckbox from './settings/SettingsCheckbox.vue'
  import SettingsRadio from './settings/SettingsRadio.vue'
  import NavDialog from '../../../components/buttons/NavDialog.vue'

  export default
    components: { IconBtn, SettingsSlider, SettingsCheckbox, NavDialog, SettingsRadio }
    data: () ->
      show: false
      gameModes: [
        { label: 'Normal', value: 'normal' },
        { label: 'Selector', value: 'selector' }
      ]
      songDuplicate: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ]
    sockets:
      SYNC_SETTINGS: (settings) ->
        this.$store.commit('game/UPDATE_SETTINGS', settings)
    computed:
      settings:
        get: () ->
          return this.$store.state.game.settings
        set: (settings) ->
          this.$store.commit('game/UPDATE_SETTINGS', settings)
      disabled: () ->
        return !(this.$store.state.game.host or this.$store.state.admin.admin) or this.$store.state.game.playing
    methods:
      updateSettings: () ->
        this.$socket.emit('UPDATE_SETTINGS', this.$store.state.game.settings)
        this.show = false
      syncSettings: () ->
        this.$socket.emit('SYNC_SETTINGS')
</script>
