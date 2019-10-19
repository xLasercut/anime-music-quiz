<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-text-field
        v-model="model"
        v-bind="$attrs"
        clearable filled
        hide-details
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'

  export default
    mixins: [ VModel ]

</script>