<template>
  <v-row justify="center" no-gutters>
    <v-col cols="10">
      <v-slider v-model.number="model" v-bind="$attrs"></v-slider>
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
    props: [ 'id' ]
</script>