<template>
  <v-dialog width="500" v-model="show">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="info" depressed @click="socket.emit('SYNC_SETTINGS')">
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
          <v-layout justify-center>
            <v-flex xs10>
              <v-slider label="Song Number" thumb-label
                v-model.number="form.songNumber">
              ></v-slider>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-flex xs10>
              <v-slider label="Guess Time" thumb-label
                v-model.number="form.guessTime">
              ></v-slider>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
              <icon-btn color="error" icon="fas fa-times" @click="show = false">Cancel</icon-btn>
              <icon-btn color="success" icon="fas fa-check" @click="updateSettings()">Confirm</icon-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import IconBtn from '../../shared/IconBtn.vue'

  export default {
    components: { IconBtn },
    data() {
      return {
        form: {
          songNumber: 20,
          guessTime: 25,
          type: ['opening', 'ending']
        },
        socket: this.$store.state.game.socket,
        show: false
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
        this.socket.on('UPDATE_CLIENT_SETTINGS', (settings) => {
          this.form = settings
        })
      }
    }
  }

</script>