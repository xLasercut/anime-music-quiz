<template>
  <v-flex xs12 sm6 md5>
    <v-combobox
      box clearable
      :items="items"
      :label="label"
      v-model.trim="model"
      :hint="hint()"
      :disabled="disabled"
      :append-outer-icon="icon"
      @click:append-outer="$emit('click:append-outer')"
      persistent-hint
      :id="id"
    >
    </v-combobox>
  </v-flex>
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