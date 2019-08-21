<template>
  <v-row justify="center">
    <v-col xs="12" sm="6">
      <v-text-field
        filled clearable
        v-model.trim="model"
        @click:append="$emit('click:append')"
        @keydown.enter.native="$emit('enter')"
        :id="id"
        v-bind="$attrs"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'

  export default
    props: [ 'id' ]
    mixins: [ VModel ]
</script>