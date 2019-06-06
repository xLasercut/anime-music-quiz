<template>
  <v-layout>
    <v-flex xs12>
      <v-data-table :items="data" :headers="headers" hide-actions>
        <template #items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.type }}</td>
          <td><a :href="props.item.src" target="_blank">View</a></td>
          <td>
            <v-btn
              color="success" small icon
              @click="addAnime(props.item)"
              :disabled="!$store.state.list.filename || inUserList(props.item)"
            >
              <v-icon size="12pt">fas fa-plus</v-icon>
            </v-btn>
            <v-btn
              color="error" small icon
              @click="removeAnime(props.item)"
              :disabled="!$store.state.list.filename || !inUserList(props.item)"
            >
              <v-icon size="12pt">fas fa-minus</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  export default
    props: [ 'data' ]
    data: () ->
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Anime', value: 'name', sortable: false },
        { text: 'Song', value: 'title', sortable: false },
        { text: 'Type', value: 'type', sortable: false },
        { text: 'Link', value: 'src', sortable: false },
        { text: 'Action', value: 'action', sortable: false }
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
