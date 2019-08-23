<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>
          <slot name="filter"></slot>
        </v-card-title>
        <v-card-text>
          <v-data-table :items="data" :headers="headers" hide-default-footer>
            <template #item.command="{ item }">
              {{ `:${item.command}:` }}
            </template>

            <template #item.emoji="{ item }">
              <v-img :src="item.src" width="20pt" v-if="item.type === 'img'" />
              <span v-if="item.type === 'dec'" class="normal-emoji">{{ item.src }}</span>
            </template>

            <template #item.action="{ item }">
              <v-btn
                :disabled="!$store.state.admin.admin"
                depressed color="error" small
                @click="deleteEmoji(item)"
                :id="`${item.command}-delete`"
              >
                delete
              </v-btn>
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
        this.$socket.emit('REMOVE_EMOJI', emoji)
</script>


<style scoped>
  .normal-emoji {
    font-size: 18pt;
  }
</style>