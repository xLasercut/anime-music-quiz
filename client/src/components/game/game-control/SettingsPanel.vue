<template>
  <v-dialog width="500" v-model="show">
    <template v-slot:activator="{ on }">
      <nav-btn
        :activator="on" color="info" @click="syncSettings()"
        icon="mdi-settings" id="game-settings-btn"
      ></nav-btn>
    </template>
    <v-card>
      <v-container grid-list-lg>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            Settings
          </v-flex>
        </v-layout>
        <v-form>
          <settings-slider
            label="Song Number"
            v-model.number="settings.songCount"
            min="1" max="100" :disabled="disabled"
            id="song-count"
          ></settings-slider>
          <settings-slider
            label="Guess Time"
            v-model.number="settings.guessTime"
            min="1" max="50" :disabled="disabled"
            id="guess-time"
          ></settings-slider>
          <settings-radio v-model="settings.mode" :disabled="disabled"></settings-radio>
          <settings-checkbox
            :disabled="disabled" v-model="settings.lists"
            :items="$store.state.userListFiles"
          ></settings-checkbox>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
              <icon-btn
                color="error" icon="mdi-close" @click="show = false"
                id="settings-cancel-btn"
              >Cancel</icon-btn>
              <icon-btn
                color="success" icon="mdi-check" @click="updateSettings()"
                :disabled="disabled" id="settings-confirm-btn"
              >
                Confirm
              </icon-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import IconBtn from '../../shared/IconBtn.vue'
  import SettingsSlider from './settings/SettingsSlider.vue'
  import SettingsCheckbox from './settings/SettingsCheckbox.vue'
  import NavBtn from '../../shared/NavBtn.vue'
  import SettingsRadio from './settings/SettingsRadio.vue'

  export default
    components: { IconBtn, SettingsSlider, SettingsCheckbox, NavBtn, SettingsRadio }
    data: () ->
      show: false
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
