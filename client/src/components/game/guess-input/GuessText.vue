<template>
  <v-flex xs12 sm6 md5>
    <v-combobox
      box clearable
      :items="items"
      :label="label"
      :search-input.sync="model"
    />
  </v-flex>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'items', 'label' ]
    mixins: [ VModel ]
</script>