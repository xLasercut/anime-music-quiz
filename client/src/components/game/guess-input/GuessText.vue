<template>
  <v-flex xs12 sm6 md5>
    <v-combobox
      box clearable
      :items="items"
      :label="label"
      :search-input.sync="model"
      :disabled="disabled"
      :append-outer-icon="icon"
      @click:append-outer="$emit('click:append-outer')"
    />
  </v-flex>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'items', 'label', 'disabled', 'icon' ]
    mixins: [ VModel ]
</script>