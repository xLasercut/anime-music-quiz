<template>
  <v-col cols="12" sm="6" md="5">
    <v-combobox
      filled clearable full-width
      :search-input.sync="model"
      :hint="hint()"
      @click:append-outer="$emit('click:append-outer')"
      persistent-hint
      auto-select-first
      v-bind="$attrs"
    >
    </v-combobox>
  </v-col>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    mixins: [ VModel ]
    methods:
      hint: () ->
        choice = '...'
        if this.model
          choice = this.model
        return "Selected #{this.label}: #{choice}"
</script>