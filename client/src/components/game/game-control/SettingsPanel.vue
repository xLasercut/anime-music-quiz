<template>
  <v-dialog width="500" v-model="show">
    <template v-slot:activator="{ on }">
      <v-btn class="settings-btn" v-on="on" color="info" flat @click="syncSettings()" :disabled="$store.state.game.playing">
        Settings
        <v-icon size="12pt" right>fas fa-cog</v-icon>
      </v-btn>
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
            min="1" max="100" :diabled="disabled"
          ></settings-slider>
          <settings-slider
            label="Guess Time"
            v-model.number="settings.guessTime"
            min="1" max="50" :disabled="disabled"
          ></settings-slider>
          <settings-checkbox
            :disabled="disabled" v-model="settings.lists"
            :items="$store.state.userListFiles"
          ></settings-checkbox>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
              <icon-btn color="error" icon="fas fa-times" @click="show = false">Cancel</icon-btn>
              <icon-btn
                color="success" icon="fas fa-check" @click="updateSettings()"
                :disabled="disabled"
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

  export default
    components: { IconBtn, SettingsSlider, SettingsCheckbox }
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
        return !(this.$store.state.game.host or this.$store.state.admin.admin)
    methods:
      updateSettings: () ->
        this.$socket.emit('UPDATE_SETTINGS', this.$store.state.game.settings)
        this.show = false
      syncSettings: () ->
        this.$socket.emit('SYNC_SETTINGS')
</script>


<style scoped>
  .settings-btn {
    border-radius: 0;
  }
</style>