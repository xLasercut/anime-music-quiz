<template>
  <v-layout>
    <primary-control @start="start()" @stop="lobby()"></primary-control>
    <secondary-control v-model="model"></secondary-control>
  </v-layout>
</template>

<script>
  import PrimaryControl from './game-control/PrimaryControl.vue'
  import SecondaryControl from './game-control/SecondaryControl.vue'
  import VModel from '../../assets/mixins/v-model.js'

  export default {
    components: { SecondaryControl, PrimaryControl },
    mixins: [ VModel ],
    data() {
      return {
        socket: this.$store.state.game.socket,
      }
    },
    methods: {
      start() {
        this.socket.emit('START_GAME')
      },
      lobby() {
        this.socket.emit('LOBBY')
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_PLAYING', (playing) => {
          this.$store.commit('game/UPDATE_PLAYING', playing)
        })
      }
    }
  }
</script>
