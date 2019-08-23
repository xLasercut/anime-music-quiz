<template>
  <v-row class="table-container">
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>
          <slot name="filter"></slot>
        </v-card-title>
        <v-card-text>
          <v-data-table :items="data" :headers="headers" hide-default-footer disable-pagination disable-filtering>
            <template #item.id="{ item }" >
              <item-id :id="item.id" />
            </template>

            <template #item.src="{ item }">
              <a :href="item.src" target="_blank">View</a>
            </template>

            <template #item.action="{ item }">
              <icon-btn color="success" icon="mdi-plus" small @click="selectSong(item)" :id="`${item.id}-select-btn`">Select</icon-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-title>
          <slot name="pagination"></slot>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import ItemId from '../../../../list-picker/list-data/ItemId.vue'
  import IconBtn from '../../../../components/buttons/IconBtn.vue'

  export default
    components: { ItemId, IconBtn }
    props: [ 'data', 'id' ]
    data: () ->
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Anime', value: 'name', sortable: false },
        { text: 'Song', value: 'title', sortable: false },
        { text: 'Type', value: 'type', sortable: false, width: 100 },
        { text: 'Link', value: 'src', sortable: false, width: 80 },
        { text: 'Action', value: 'action', sortable: false, width: 140 }
      ]
    methods:
      selectSong: (song) ->
        this.$emit('select-song', song)
</script>


<style scoped>
  .table-container {
    height: calc(100% - 70px - 70px);
    overflow: auto;
  }
</style>