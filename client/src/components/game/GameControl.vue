<template>
  <v-toolbar-items v-if="$route.path == '/home'">
    <nav-btn color="success" v-if="showPlay" @click="play()" icon="fas fa-play">
      Start
    </nav-btn>
    <nav-btn color="error" v-if="showStop" @click="stop()" icon="fas fa-stop">
      Stop
    </nav-btn>
    <nav-btn color="warning" v-if="$store.state.game.playing" @click="toggle()" icon="fas fa-info">
      Answer
    </nav-btn>
    <settings-panel></settings-panel>
    <volume-slider></volume-slider>
  </v-toolbar-items>
</template>

<script>
  import NavBtn from '../shared/NavBtn.vue'
  import SettingsPanel from './game-control/SettingsPanel.vue'
  import VolumeSlider from './game-control/VolumeSlider.vue'


  export default {
    components: { SettingsPanel, VolumeSlider, NavBtn },
    computed: {
      showPlay() {
        return (!this.$store.state.game.playing && this.$store.state.game.host)
      },
      showStop() {
        return (this.$store.state.game.playing && this.$store.state.game.host)
      }
    },
    methods: {
      play() {
        this.$store.commit('game/START_GAME')
      },
      stop() {
        this.$store.commit('game/STOP_GAME')
      },
      toggle() {
        this.$store.commit('game/TOGGLE_ANSWER')
      }
    }
  }
</script>
