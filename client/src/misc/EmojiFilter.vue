<template>
  <v-row justify="center">
    <v-col cols="4">
      <v-text-field label="Emoji" v-model="model.command" clearable id="filter-emoji" hide-details></v-text-field>
    </v-col>
    <v-col cols="auto">
      <add-emoji></add-emoji>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../assets/mixins/v-model.coffee'
  import AddEmoji from './AddEmoji.vue'

  export default
    mixins: [ VModel ]
    components: { AddEmoji }
</script>
