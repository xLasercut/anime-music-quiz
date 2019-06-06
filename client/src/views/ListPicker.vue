<template>
  <v-container fluid grid-list-lg>
    <list-filter v-model="filter"></list-filter>
    <list-data
      :data="displayData()"
      @add-anime="addAnime($event)"
      @remove-anime="removeAnime($event)"
      v-if="!loading"
    ></list-data>
    <loading v-if="loading"></loading>
    <list-pagination v-model="currentPage" :length="maxPage"></list-pagination>
  </v-container>
</template>

<script lang="coffee">
  import ListFilter from '../components/list-picker/ListFilter.vue'
  import ListData from '../components/list-picker/ListData.vue'
  import ListPagination from '../components/list-picker/ListPagination.vue'
  import Loading from '../components/shared/Loading.vue'
  import EventBus from '../assets/mixins/event-bus.coffee'

  export default
    components: { ListFilter, ListData, ListPagination, Loading }
    data: () ->
      socket: this.$store.state.list.socket,
      pageSize: 8,
      currentPage: 1,
      filter: {
        anime: '',
        song: ''
      },
      maxPage: 1,
      loading: false
    sockets:
      SYNC_USER_LIST: (list, filename) ->
        if this.$store.state.list.filename == filename
          this.$store.commit('list/UPDATE_USER_LIST', list)
      SYNC_FULL_LIST: (list) ->
        this.$store.commit('list/UPDATE_FULL_LIST', list)
        this.loading = false
    methods:
      filteredData: () ->
        songfilter = ''
        animefilter = ''
        if this.filter.song
          songfilter = this.filter.song.trim().toLowerCase()
        if this.filter.anime
          animefilter = this.filter.anime.trim().toLowerCase()
        return this.$store.state.list.fullList.filter( (anime) =>
          names = "#{anime.name},#{anime.altName.join(',')}".toLowerCase()
          songName = anime.title.toLowerCase()
          if names.includes(animefilter) and songName.includes(songfilter)
            return anime
        )
      displayData: () ->
        start = (this.currentPage - 1) * this.pageSize
        end = start + this.pageSize
        this.maxPage = Math.ceil(this.filteredData().length / this.pageSize)
        return this.filteredData().slice(start, end)
      addAnime: (anime) ->
        this.$store.commit('list/ADD_ANIME', anime)
        this.updateUserList()
      removeAnime: (anime) ->
        this.$store.commit('list/REMOVE_ANIME', anime)
        this.updateUserList()
      updateUserList: () ->
        this.$socket.emit('UPDATE_USER_LIST', this.$store.state.list.userList, this.$store.state.list.filename)
      syncFullList: () ->
        this.loading = true
        this.$socket.emit('SYNC_FULL_LIST')
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')

      this.syncFullList()

      EventBus.$on('sync-full-list', () =>
        this.syncFullList()
      )
</script>