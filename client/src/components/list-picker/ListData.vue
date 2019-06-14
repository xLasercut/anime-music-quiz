<template>
  <v-layout class="table-container">
    <v-flex xs12>
      <v-data-table :items="data" :headers="headers" hide-actions>
        <template #items="props">
          <td><item-id :id="props.item.id" /></td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.type }}</td>
          <td><a :href="props.item.src" target="_blank">View</a></td>
          <td>
            <item-action-btn
              color="success" @click="addAnime(props.item)"
              :disabled="!$store.state.list.filename || inUserList(props.item)"
            >
              fas fa-plus
            </item-action-btn>
            <item-action-btn
              color="error"
              @click="removeAnime(props.item)"
              :disabled="!$store.state.list.filename || !inUserList(props.item)"
            >
              fas fa-minus
            </item-action-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import ItemId from './list-data/ItemId.vue'
  import ItemActionBtn from './list-data/ItemActionBtn.vue'

  export default
    components: { ItemId, ItemActionBtn }
    props: [ 'data' ]
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


<style scoped>
  .table-container {
    height: calc(100% - 70px - 70px);
    overflow: auto;
  }

</style>