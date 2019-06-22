<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-text-field
        :label="label" box clearable
        v-model.trim="model"
        :rules="rules"
        :append-icon="appendIcon"
        @click:append="$emit('click:append')"
        @keydown.enter.native="$emit('enter')"
        :type="type"
        :counter="counter"
        :id="id" :disabled="disabled"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'label', 'rules', 'appendIcon', 'type', 'counter', 'id', 'disabled' ]
    mixins: [ VModel ]
</script>