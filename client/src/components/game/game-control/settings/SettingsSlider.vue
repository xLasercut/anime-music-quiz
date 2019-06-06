<template>
  <v-layout justify-center>
    <v-flex xs10>
      <v-slider :label="label"
        v-model.number="model"
        :min="min" :max="max"
        :disabled="!$store.state.game.host"
      ></v-slider>
    </v-flex>
    <v-flex shrink xs2>
      <v-text-field
        class="mt-0" v-model.number="model"
        type="number" :min="min" :max="max"
        :disabled="!$store.state.game.host"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../../../assets/mixins/v-model.coffee'

  export default
    mixins: [ VModel ]
    props: [ 'min', 'max', 'label' ]
</script>