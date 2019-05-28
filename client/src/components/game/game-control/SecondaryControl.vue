<template>
  <v-flex xs6>
    <v-layout justify-end>
      <v-flex shrink style="width: 120px">
        <v-slider prepend-icon="fas fa-volume-down" v-model.number="model"></v-slider>
      </v-flex>
      <v-flex shrink>
        <settings-panel></settings-panel>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
  import SettingsPanel from './SettingsPanel.vue'
  import VModel from '../../../assets/mixins/v-model.js'

  export default {
    components: { SettingsPanel },
    mixins: [ VModel ]
  }
</script>