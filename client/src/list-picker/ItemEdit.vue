<template>
  <v-card>
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-col cols="auto">
          Song Edit
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          {{model['songId']}}
        </v-col>
      </v-row>
      <item-edit-anime-row
        v-model="model['anime']"
      ></item-edit-anime-row>
      <item-edit-row
        v-model.trim="model['src']"
        label="Source"
        id="add-song-to-list-src"
      ></item-edit-row>
      <item-edit-row
        v-model.trim="model['title']"
        label="Title"
        id="add-song-to-list-title"
      ></item-edit-row>
      <item-edit-row
        v-model.trim="model['artist']"
        label="Artist"
        id="add-song-to-list-artist"
      ></item-edit-row>
      <item-edit-row
        v-model.trim="model['type']"
        label="Type"
        id="add-song-to-list-type"
      ></item-edit-row>
      <v-row justify="center">
        <v-col cols="auto">
          <icon-btn
            color="error" icon="mdi-close" @click="$emit('cancel-edit')"
            id="add-song-to-list-cancel"
          >Cancel</icon-btn>
        </v-col>
        <v-col cols="auto">
          <icon-btn
            color="success" icon="mdi-check" @click="$emit('confirm-edit')"
            id="add-song-to-list-confirm"
          >Confirm</icon-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="coffee">
  import ItemEditRow from './item-edit/ItemEditRow.vue'
  import ItemEditAnimeRow from './item-edit/ItemEditAnimeRow.vue'
  import VModel from '../assets/mixins/v-model.coffee'
  import IconBtn from '../components/buttons/IconBtn.vue'

  export default
    mixins: [ VModel ]
    components: { ItemEditRow, ItemEditAnimeRow, IconBtn }
</script>