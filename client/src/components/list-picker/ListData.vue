<template>
  <v-layout>
    <v-flex xs12>
      <v-data-table :items="data" :headers="headers" hide-actions>
        <template #items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.type }}</td>
          <td><a :href="props.item.src" target="_blank">View</a></td>
          <td>
            <v-btn
              color="success" small icon
              @click="addAnime(props.item)"
              v-if="!inUserList(props.item)"
            >
              <v-icon size="12pt">fas fa-plus</v-icon>
            </v-btn>
            <v-btn
              color="error" small icon
              @click="removeAnime(props.item)"
              v-if="inUserList(props.item)"
            >
              <v-icon size="12pt">fas fa-minus</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: [ 'data' ],
    data() {
      return {
        headers: [
          { text: 'Anime', value: 'name', sortable: false },
          { text: 'Song', value: 'title', sortable: false },
          { text: 'Type', value: 'type', sortable: false },
          { text: 'Link', value: 'src', sortable: false },
          { text: 'Action', value: 'action', sortable: false }
        ]
      }
    },
    methods: {
      inUserList(anime) {
        for (var item of this.$store.state.list.userList) {
          if (item.name === anime.name && anime.src === item.src) {
            return true
          }
        }
        return false
      },
      addAnime(anime) {
        this.$emit('add-anime', anime)
      },
      removeAnime(anime) {
        this.$emit('remove-anime', anime)
      }
    }
  }
</script>
