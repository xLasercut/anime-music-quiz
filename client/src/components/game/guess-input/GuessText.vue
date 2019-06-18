<template>
  <v-flex xs12 sm6 md5>
    <v-combobox
      box clearable
      :items="items"
      :label="label"
      v-model="model"
      :disabled="disabled"
      :append-outer-icon="icon"
      @click:append-outer="$emit('click:append-outer')"
      auto-select-first chips
    >
      <template #selection="data">
        <v-chip color="success" text-color="white">
          <v-icon left>mdi-check</v-icon>{{data.item}}
        </v-chip>
      </template>
    </v-combobox>
  </v-flex>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'items', 'label', 'disabled', 'icon' ]
    mixins: [ VModel ]
</script>