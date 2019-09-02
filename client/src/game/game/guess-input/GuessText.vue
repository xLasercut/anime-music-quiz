<template>
  <v-col cols="12" sm="6" md="5">
    <v-combobox
      filled clearable hide-details
      :search-input.sync="model"
      @click:append-outer="$emit('click:append-outer')"
      auto-select-first
      :id="id"
      v-bind="$attrs"
    >
    </v-combobox>
  </v-col>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'id' ]
    mixins: [ VModel ]
</script>