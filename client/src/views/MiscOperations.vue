<template>
  <v-container fluid grid-list-lg>
    <emoji-filter v-model="filter"></emoji-filter>
    <emoji-data
      :data="displayData()"
      v-if="!$store.state.misc.loading"
    ></emoji-data>
    <loading v-if="$store.state.misc.loading"></loading>
    <pagination v-model="pagination" :length="maxPage"></pagination>
  </v-container>
</template>

<script lang="coffee">
  import EmojiData from '../components/misc/EmojiData.vue'
  import EmojiFilter from '../components/misc/EmojiFilter.vue'
  import Loading from '../components/shared/Loading.vue'
  import Pagination from '../components/shared/Pagination.vue'

  export default
    components: { EmojiData, EmojiFilter, Loading, Pagination }
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
      SYNC_EMOJI_DATA: (list) ->
        this.$store.commit('misc/UPDATE_EMOJI_LIST', list)
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
        return this.$store.state.misc.emojiList.filter( (emoji) =>
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