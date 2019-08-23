<template>
  <v-container fluid class="emoji-container">
    <emoji-data :data="displayData()">
      <emoji-filter v-model="filter" slot="filter"></emoji-filter>
      <pagination v-model="pagination" :length="maxPage" slot="pagination"></pagination>
    </emoji-data>
  </v-container>
</template>

<script lang="coffee">
  import EmojiData from '../misc/EmojiData.vue'
  import EmojiFilter from '../misc/EmojiFilter.vue'
  import Pagination from '../components/Pagination.vue'

  export default
    components: { EmojiData, EmojiFilter, Pagination }
    data: () ->
      filter: {
        command: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 5
      },
      maxPage: 1
    sockets:
      disconnect: () ->
        this.$router.push('/')
    methods:
      displayData: () ->
        filteredData = this.filteredData()
        start = (this.pagination.currentPage - 1) * this.pagination.pageSize
        end = start + this.pagination.pageSize
        this.maxPage = Math.ceil(filteredData.length / this.pagination.pageSize)
        return filteredData.slice(start, end)
      filteredData: () ->
        commandfilter = ''
        if this.filter.command
          commandfilter = this.filter.command.trim().toLowerCase()
        return this.$store.state.emoji.emojiList.filter( (emoji) =>
          command = emoji.command.toLowerCase()
          if command.includes(commandfilter)
            return emoji
        ).sort( (a, b) =>
          if a.command > b.command
            return 1
          else
            return -1
        )
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')
</script>

<style scoped>
  .emoji-container {
    height: calc(100vh - 65px);
    overflow: auto;
  }
</style>