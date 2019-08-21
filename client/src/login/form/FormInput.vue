<template>
  <v-row justify="center">
    <v-col xs="12" sm="6">
      <v-text-field
        :label="label" filled clearable
        v-model.trim="model"
        :rules="rules"
        :append-icon="appendIcon"
        @click:append="$emit('click:append')"
        @keydown.enter.native="$emit('enter')"
        :type="type"
        :counter="counter"
        :id="id" :disabled="disabled"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'

  export default
    props: [ 'label', 'rules', 'appendIcon', 'type', 'counter', 'id', 'disabled' ]
    mixins: [ VModel ]
</script>