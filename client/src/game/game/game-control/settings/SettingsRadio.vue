<template>
  <v-layout justify-center wrap>
    <v-flex xs12>
      <v-radio-group :label="label" row v-model="model" :disabled="disabled">
        <v-radio v-for="item in options" :key="`${label}_${item.value}`" :label="item.label" :value="item.value" :id="radioId(item.value)">
        </v-radio>
      </v-radio-group>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'disabled', 'label', 'options', 'id' ]
    mixins: [ VModel ]
    methods:
      radioId: (val) ->
        if this.id
          return "#{this.id}-#{val}"
        return null
</script>