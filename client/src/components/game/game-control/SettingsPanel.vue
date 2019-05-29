<template>
  <v-dialog width="500" v-model="show">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="info" depressed @click="socket.emit('SYNC_SETTINGS')" :disabled="$store.state.game.playing">
        Settings
        <v-icon size="14pt" right>fas fa-cog</v-icon>
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
            v-model.number="form.songNumber"
            min="1" max="100"
          ></settings-slider>
          <settings-slider
            label="Guess Time"
            v-model.number="form.guessTime"
            min="1" max="50"
          ></settings-slider>
          <settings-checkbox v-model="form.lists" :items="userListFiles"></settings-checkbox>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
              <icon-btn color="error" icon="fas fa-times" @click="show = false">Cancel</icon-btn>
              <icon-btn
                color="success" icon="fas fa-check" @click="updateSettings()"
                :disabled="!$store.state.game.host"
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

<script>
  import IconBtn from '../../shared/IconBtn.vue'
  import SettingsSlider from './settings/SettingsSlider.vue'
  import SettingsCheckbox from './settings/SettingsCheckbox.vue'

  export default {
    components: { IconBtn, SettingsSlider, SettingsCheckbox },
    data() {
      return {
        form: {
          songNumber: 20,
          guessTime: 25,
          type: ['opening', 'ending'],
          lists: []
        },
        socket: this.$store.state.game.socket,
        show: false,
        userListFiles: []
      }
    },
    computed: {
      disabled() {
        return !this.$store.state.game.host
      }
    },
    methods: {
      updateSettings() {
        this.socket.emit('UPDATE_SERVER_SETTINGS', this.form)
        this.show = false
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_CLIENT_SETTINGS', (settings, userListFiles) => {
          this.form = settings
          this.userListFiles = userListFiles
        })
      }
    }
  }

</script>