<template>
  <v-container fluid grid-list-lg>
    <list-filter v-model="filter"></list-filter>
    <list-data
      :data="displayData()"
      @add-anime="addAnime($event)"
      @remove-anime="removeAnime($event)"
      v-if="!$store.state.list.loading"
    ></list-data>
    <loading v-if="$store.state.list.loading"></loading>
    <list-pagination v-model="currentPage" :length="maxPage"></list-pagination>
  </v-container>
</template>

<script lang="coffee">
  import ListData from '../components/list-picker/ListData.vue'
  import ListPagination from '../components/list-picker/ListPagination.vue'
  import Loading from '../components/shared/Loading.vue'
  import TableFilter from '../assets/mixins/table-filter.coffee'

  export default
    mixins: [ TableFilter ]
    components: { ListData, ListPagination, Loading }
    data: () ->
      socket: this.$store.state.list.socket,
      pageSize: 8,
      currentPage: 1,
      maxPage: 1
    sockets:
      SYNC_USER_LIST: (list, filename) ->
        if this.$store.state.list.filename == filename
          this.$store.commit('list/UPDATE_USER_LIST', list)
      SYNC_FULL_LIST: (list) ->
        this.$store.commit('list/UPDATE_FULL_LIST', list)
    methods:
      displayData: () ->
        filteredData = this.filteredData(this.$store.state.list.fullList)
        start = (this.currentPage - 1) * this.pageSize
        end = start + this.pageSize
        this.maxPage = Math.ceil(filteredData.length / this.pageSize)
        return filteredData.slice(start, end)
      addAnime: (anime) ->
        this.$store.commit('list/ADD_ANIME', anime)
        this.updateUserList()
      removeAnime: (anime) ->
        this.$store.commit('list/REMOVE_ANIME', anime)
        this.updateUserList()
      updateUserList: () ->
        this.$socket.emit('UPDATE_USER_LIST', this.$store.state.list.userList, this.$store.state.list.filename)
      syncFullList: () ->
        this.$store.commit('list/UPDATE_LOADING', true)
        this.$socket.emit('SYNC_FULL_LIST')
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')

      this.syncFullList()
</script>