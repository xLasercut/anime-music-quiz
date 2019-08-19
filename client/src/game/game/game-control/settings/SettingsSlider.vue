<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-slider :label="label"
        v-model.number="model"
        :min="min" :max="max"
        :disabled="disabled"
      ></v-slider>
    </v-col>
    <v-col cols="2">
      <v-text-field
        class="mt-0 pt-0" v-model.number="model"
        type="number" :min="min" :max="max"
        :disabled="disabled" :id="id"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../../../../assets/mixins/v-model.coffee'

  export default
    mixins: [ VModel ]
    props: [ 'min', 'max', 'label', 'disabled', 'id' ]
</script>