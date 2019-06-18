<template>
  <v-layout justify-center wrap>
    <v-flex shrink v-for="(item, index) in items" :key="`checkbox_${index}`">
      <v-checkbox
        :label="item" :value="item"
        v-model="model"
        :disabled="disabled"
        :id="`checkbox_${item}`"
      ></v-checkbox>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'items', 'disabled' ]
    mixins: [ VModel ]
</script>