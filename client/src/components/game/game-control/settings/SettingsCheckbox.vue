<template>
  <v-layout justify-center wrap>
    <v-flex shrink v-for="(item, index) in items" :key="`checkbox_${index}`">
      <v-checkbox
        :label="item" :value="item"
        v-model="model"
      ></v-checkbox>
    </v-flex>
  </v-layout>
</template>

<script>
  import VModel from '../../../../assets/mixins/v-model.js'

  export default {
    props: [ 'items' ],
    mixins: [ VModel ]
  }
</script>