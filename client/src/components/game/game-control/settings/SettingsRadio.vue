<template>
  <v-layout justify-center wrap>
    <v-flex xs12>
      <v-radio-group label="Game Mode" row v-model="model" :disabled="disabled">
        <v-radio v-for="item in modes" :key="`mode_${item.value}`" :label="item.label" :value="item.value" :id="`game-mode-${item.value}`">
        </v-radio>
      </v-radio-group>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'disabled' ]
    mixins: [ VModel ]
    data: () ->
      modes: [
        { label: 'Normal', value: 'normal' },
        { label: 'Gamble', value: 'gamble' }
      ]
</script>