<template>
  <v-layout justify-center class="filter-container">
    <v-flex xs4>
      <v-text-field label="Anime" v-model="model.anime" clearable :id="`filter-anime-${id}`"></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-text-field label="Song" v-model="model.song" clearable :id="`filter-song-${id}`"></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-select :items="items" label="Type" v-model="model.type" :id="`filter-type-${id}`"></v-select>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../assets/mixins/v-model.coffee'

  export default
    props: [ 'id' ]
    mixins: [ VModel ]
    data: () ->
      items: ['All', 'OP', 'ED', 'Insert']
</script>


<style scoped>
  .filter-container {
    height: 70px;
  }
</style>