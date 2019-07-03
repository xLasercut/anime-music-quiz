<template>
  <v-layout justify-center class="filter-container">
    <v-flex xs4>
      <v-text-field label="Emoji" v-model="model.command" clearable id="filter-emoji"></v-text-field>
    </v-flex>
    <v-flex shrink>
      <add-emoji></add-emoji>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../assets/mixins/v-model.coffee'
  import AddEmoji from './AddEmoji.vue'

  export default
    mixins: [ VModel ]
    components: { AddEmoji }
</script>


<style scoped>
  .filter-container {
    height: 70px;
  }
</style>