<template>
  <v-list v-if="$route.path == '/home'">
    <play-btn></play-btn>
    <stop-btn></stop-btn>
    <answer-btn></answer-btn>
    <settings-panel></settings-panel>
    <volume-slider></volume-slider>
  </v-list>
</template>

<script>
  import PlayBtn from './game-control/PlayBtn.vue'
  import StopBtn from './game-control/StopBtn.vue'
  import AnswerBtn from './game-control/AnswerBtn.vue'
  import SettingsPanel from './game-control/SettingsPanel.vue'
  import VolumeSlider from './game-control/VolumeSlider.vue'


  export default {
    components: { PlayBtn, StopBtn, AnswerBtn, SettingsPanel, VolumeSlider }
  }
</script>
