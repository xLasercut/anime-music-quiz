<template>
  <v-toolbar-items v-if="$route.path == '/home'">
    <admin-panel></admin-panel>
    <nav-btn color="success" v-if="showPlay" @click="play()" icon="mdi-play">
      Start
    </nav-btn>
    <nav-btn color="error" v-if="showStop" @click="stop()" icon="mdi-stop">
      Stop
    </nav-btn>
    <settings-panel></settings-panel>
    <volume-slider></volume-slider>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import NavBtn from '../shared/NavBtn.vue'
  import SettingsPanel from './game-control/SettingsPanel.vue'
  import VolumeSlider from './game-control/VolumeSlider.vue'
  import AdminPanel from '../shared/AdminPanel.vue'

  export default
    components: { SettingsPanel, VolumeSlider, NavBtn, AdminPanel }
    computed:
      showPlay: () ->
        return (!this.$store.state.game.playing and (this.$store.state.game.host or this.$store.state.admin.admin))
      showStop: () ->
        return (this.$store.state.game.playing and (this.$store.state.game.host or this.$store.state.admin.admin))
    methods:
      play: () ->
        this.$socket.emit('START_GAME')
      stop: () ->
        this.$socket.emit('STOP_GAME')
</script>
