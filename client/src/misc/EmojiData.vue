<template>
  <v-layout class="table-container">
    <v-flex xs12>
      <v-data-table :items="data" :headers="headers" hide-actions>
        <template #items="props">
          <td>{{ `:${props.item.command}:` }}</td>
          <td>
            <v-img :src="props.item.src" width="20pt" v-if="props.item.type === 'img'" />
            <span v-if="props.item.type === 'dec'" class="normal-emoji">{{ props.item.src }}</span>
          </td>
          <td>{{ props.item.type }}</td>
          <td>{{ props.item.src }}</td>
          <td>
            <v-btn
              :disabled="!$store.state.admin.admin"
              depressed color="error" small
              @click="deleteEmoji(props.item)"
              :id="`${props.item.command}-delete`"
            >
              delete
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
        { text: 'Command', value: 'command', sortable: false },
        { text: 'Emoji', value: 'emoji', sortable: false },
        { text: 'Type', value: 'type', sortable: false },
        { text: 'Source', value: 'src', sortable: false },
        { text: 'Action', value: 'action', sortable: false, width: 100 }
      ]
    methods:
      deleteEmoji: (emoji) ->
        this.$store.commit('emoji/DELETE_EMOJI', emoji)
        this.$socket.emit('UPDATE_EMOJI_DATA', this.$store.state.emoji.emojiList)
</script>


<style scoped>
  .table-container {
    height: calc(100% - 70px - 70px);
    overflow: auto;
  }

  .normal-emoji {
    font-size: 18pt;
  }
</style>