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
      ></item-edit-row>
      <item-edit-row
        v-model.trim="model['title']"
        label="Title"
      ></item-edit-row>
      <item-edit-row
        v-model.trim="model['artist']"
        label="Artist"
      ></item-edit-row>
      <item-edit-row
        v-model.trim="model['type']"
        label="Type"
      ></item-edit-row>
      <v-row justify="center">
        <v-col cols="auto">
          <icon-btn color="error" icon="mdi-close" @click="$emit('cancel-edit')">Cancel</icon-btn>
        </v-col>
        <v-col cols="auto">
          <icon-btn color="success" icon="mdi-check" @click="$emit('confirm-edit')">Confirm</icon-btn>
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