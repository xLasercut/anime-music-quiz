<template>
  <v-col cols="12" sm="6" md="5">
    <v-combobox
      filled clearable full-width
      :items="items"
      :label="label"
      :search-input.sync="model"
      :hint="hint()"
      :disabled="disabled"
      :append-outer-icon="icon"
      @click:append-outer="$emit('click:append-outer')"
      persistent-hint
      :id="id"
    >
    </v-combobox>
  </v-col>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'items', 'label', 'disabled', 'icon', 'id' ]
    mixins: [ VModel ]
    methods:
      hint: () ->
        choice = '...'
        if this.model
          choice = this.model
        return "Selected #{this.label}: #{choice}"
</script>