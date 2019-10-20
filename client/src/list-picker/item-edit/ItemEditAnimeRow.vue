<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <icon-btn
            color="success" icon="mdi-plus" @click="addAnime()"
            id="add-song-to-list-add-anime"
          >Add Anime</icon-btn>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Anime" v-model.trim="animeToAdd" clearable filled hide-details
            id="add-song-to-list-anime"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto" v-for="(item, index) in model" :key="`song-edit-${index}`">
      <v-chip
        color="primary" close @click:close="removeAnime(index)"
      >{{item}}</v-chip>
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
