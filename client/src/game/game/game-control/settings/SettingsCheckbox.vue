<template>
  <v-row justify="center">
    <v-col cols="auto" v-for="(item, index) in items" :key="`checkbox_${index}`">
      <v-checkbox
        :label="item" :value="item"
        v-model="model"
        :disabled="disabled"
        :id="checkboxId(item)"
      ></v-checkbox>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../../../../assets/mixins/v-model.coffee'

  export default
    props: [ 'items', 'disabled' ]
    mixins: [ VModel ]
    methods:
      checkboxId: (item) ->
        return "setting-user-list-#{item.replace('.json', '')}"
</script>