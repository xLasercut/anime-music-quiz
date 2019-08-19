<template>
  <v-dialog width="500" v-model="show">
    <template v-slot:activator="{ on }">
      <nav-btn
        :activator="on" color="info" @click="syncSettings()"
        icon="mdi-settings" id="game-settings-btn"
      ></nav-btn>
    </template>
    <v-card>
      <v-container>
        <v-row justify="center">
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
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import IconBtn from '../../../components/buttons/IconBtn.vue'
  import SettingsSlider from './settings/SettingsSlider.vue'
  import SettingsCheckbox from './settings/SettingsCheckbox.vue'
  import NavBtn from '../../../components/buttons/NavBtn.vue'
  import SettingsRadio from './settings/SettingsRadio.vue'

  export default
    components: { IconBtn, SettingsSlider, SettingsCheckbox, NavBtn, SettingsRadio }
    data: () ->
      show: false
      gameModes: [
        { label: 'Normal', value: 'normal' },
        { label: 'Gamble', value: 'gamble' }
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
