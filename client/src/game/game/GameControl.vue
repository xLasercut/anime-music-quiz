<template>
  <v-toolbar-items>
    <song-selector-panel></song-selector-panel>
    <nav-btn color="success" v-if="showPlay" @click="play()" icon="mdi-play" id="game-play-btn"></nav-btn>
    <nav-btn color="error" v-if="showStop" @click="stop()" icon="mdi-stop" id="game-stop-btn"></nav-btn>
    <settings-panel></settings-panel>
    <volume-slider></volume-slider>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import NavBtn from '../../components/buttons/NavBtn.vue'
  import SettingsPanel from './game-control/SettingsPanel.vue'
  import VolumeSlider from './game-control/VolumeSlider.vue'
  import SongSelectorPanel from './game-control/SongSelectorPanel.vue'

  export default
    components: { SettingsPanel, VolumeSlider, NavBtn, SongSelectorPanel }
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
