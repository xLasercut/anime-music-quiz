<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>
          <slot name="filter"></slot>
        </v-card-title>
        <v-card-text>
          <v-data-table :items="data" :headers="headers" disable-filtering disable-pagination hide-default-footer>
            <template #item.id="{ item }" >
              <item-id :id="item.id" />
            </template>

            <template #item.src="{ item }">
              <a :href="item.src" target="_blank">View</a>
            </template>

            <template #item.action="{ item }">
              <item-action-btn
                  color="success" @click="addAnime(item)"
                  :disabled="!$store.state.list.filename || inUserList(item)"
                  :id="`add-${item.id}-${id}`"
                >
                  mdi-plus
                </item-action-btn>
                <item-action-btn
                  color="error"
                  @click="removeAnime(item)"
                  :disabled="!$store.state.list.filename || !inUserList(item)"
                  :id="`remove-${item.id}-${id}`"
                >
                  mdi-minus
                </item-action-btn>
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
  import ItemId from './list-data/ItemId.vue'
  import ItemActionBtn from './list-data/ItemActionBtn.vue'

  export default
    components: { ItemId, ItemActionBtn }
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
      inUserList: (anime) ->
        for item in this.$store.state.list.userList
          if anime.id == item.id
            return true
        return false

      addAnime: (anime) ->
        this.$emit('add-anime', anime)
      removeAnime: (anime) ->
        this.$emit('remove-anime', anime)
</script>