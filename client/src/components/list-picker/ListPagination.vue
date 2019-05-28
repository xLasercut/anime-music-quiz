<template>
  <v-layout>
    <v-flex xs12 class="text-xs-center">
      <v-pagination
        v-model="model"
        :length="length"
        total-visible="10"
      >
      </v-pagination>
    </v-flex>
  </v-layout>
</template>

<script>
  import VModel from '../../assets/mixins/v-model.js'

  export default {
    mixins: [ VModel ],
    props: [ 'length' ]
  }
</script>
