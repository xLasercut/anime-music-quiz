<template>
  <v-row justify="center" class="filter-container">
    <v-col cols="4">
      <v-text-field label="Anime" v-model="model.anime" clearable :id="`filter-anime-${id}`" hide-details></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field label="Song" v-model="model.song" clearable :id="`filter-song-${id}`" hide-details></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-select :items="items" label="Type" v-model="model.type" :id="`filter-type-${id}`" hide-details></v-select>
    </v-col>
  </v-row>
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