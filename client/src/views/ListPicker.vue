<template>
  <v-container fluid grid-list-lg class="list-picker-container">
    <list-filter v-model="filter" id="main"></list-filter>
    <list-data
      :data="displayData()" id="main"
      @add-anime="addAnime($event)"
      @remove-anime="removeAnime($event)"
      v-if="!$store.state.list.loading"
    ></list-data>
    <loading v-if="$store.state.list.loading"></loading>
    <pagination v-model="pagination" :length="maxPage"></pagination>
  </v-container>
</template>

<script lang="coffee">
  import ListData from '../list-picker/ListData.vue'
  import Pagination from '../components/Pagination.vue'
  import Loading from '../components/Loading.vue'
  import TableFilter from '../list-picker/mixins/table-filter.coffee'
  import Notification from '../assets/mixins/notification.coffee'

  export default
    mixins: [ TableFilter, Notification ]
    components: { ListData, Pagination, Loading }
    data: () ->
      pagination: {
        currentPage: 1,
        pageSize: 5
      },
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
        start = (this.pagination.currentPage - 1) * this.pagination.pageSize
        end = start + this.pagination.pageSize
        this.maxPage = Math.ceil(filteredData.length / this.pagination.pageSize)
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

<style scoped>
  .list-picker-container {
    height: calc(100vh - 60px);
    padding: 10px;
  }
</style>