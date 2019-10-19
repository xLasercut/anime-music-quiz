<template>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <icon-btn color="success" icon="mdi-plus" @click="addAnime()">Add Anime</icon-btn>
    </v-col>
    <v-col cols="8">
      <v-text-field label="Anime" v-model.trim="animeToAdd" clearable filled hide-details></v-text-field>
    </v-col>
    <v-col cols="auto" v-for="(item, index) in model" :key="`song-edit-${index}`">
      <v-chip color="primary" close @click:close="removeAnime(index)">{{item}}</v-chip>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'
  import IconBtn from '../../components/buttons/IconBtn.vue'

  export default
    mixins: [ VModel ]
    components: { IconBtn }
    data: () ->
      animeToAdd: ''
    methods:
      removeAnime: (index) ->
        this.model.splice(index, 1)
      addAnime: () ->
        if this.animeToAdd
          this.model.push(this.animeToAdd)
          this.animeToAdd = ''
</script>
