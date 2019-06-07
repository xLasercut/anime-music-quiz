<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-text-field label="Anime" v-model="model.anime" clearable clear-icon="far fa-times-circle"></v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field label="Song" v-model="model.song" clearable clear-icon="far fa-times-circle"></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'

  export default
    mixins: [ VModel ]
</script>
