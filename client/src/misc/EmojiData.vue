<template>
  <v-row>
    <v-col cols="12">
      <v-card flat tile>
        <v-container fluid>
          <emoji-filter v-model="filter"></emoji-filter>
          <v-row no-gutters>
            <v-col cols="12">
              <v-data-table
                :items="displayData()" :headers="headers"
                disable-sort disable-filtering
                disable-pagination
                hide-default-footer dense
              >
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
                    depressed color="error" small tile
                    @click="deleteEmoji(item)"
                    :id="`${item.command}-delete`"
                  >
                    delete
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-pagination :length="maxPage" v-model="currentPage" total-visible="10"></v-pagination>
            </v-col>
            <v-col cols="2">
              <v-select v-model="itemsPerPage" :items="itemOptions"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import EmojiFilter from './EmojiFilter.vue'

  export default
    props: [ 'data' ]
    components: { EmojiFilter }
    data: () ->
      headers: [
        { text: 'Command', value: 'command' },
        { text: 'Emoji', value: 'emoji' },
        { text: 'Type', value: 'type' },
        { text: 'Source', value: 'src' },
        { text: 'Action', value: 'action', width: 100 }
      ]
      itemOptions: [5, 10, 15, 20]
      filter: {
        command: ''
      }
      itemsPerPage: 10
      maxPage: 1,
      currentPage: 1
    methods:
      deleteEmoji: (emoji) ->
        this.$socket.emit('REMOVE_EMOJI', emoji)
      filteredData: () ->
        commandfilter = ''
        if this.filter.command
          commandfilter = this.filter.command.trim().toLowerCase()
        return this.data.filter( (emoji) =>
          command = emoji.command.toLowerCase()
          if command.includes(commandfilter)
            return emoji
        ).sort( (a, b) =>
          if a.command > b.command
            return 1
          else
            return -1
        )
      displayData: () ->
        filteredData = this.filteredData()
        this.maxPage = Math.ceil(filteredData.length / this.itemsPerPage)
        if this.currentPage > this.maxPage
          this.currentPage = 1
        startIndex = (this.currentPage - 1) * this.itemsPerPage
        endIndex = startIndex + this.itemsPerPage
        return filteredData.slice(startIndex, endIndex)
</script>


<style scoped>
  .normal-emoji {
    font-size: 18pt;
  }
</style>