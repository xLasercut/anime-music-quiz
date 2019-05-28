<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-text-field
        :label="label" box clearable
        v-model="model"
        :rules="rules"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  import VModel from '../../../assets/mixins/v-model.js'

  export default {
    props: [ 'label', 'rules' ],
    mixins: [ VModel ]
  }
</script>