<template>
  <v-container fluid class="list-picker-container">
    <list-data
      :data="displayData()" id="main"
      @add-anime="addAnime($event)"
      @remove-anime="removeAnime($event)"
    >
      <list-filter v-model="filter" id="main" slot="filter"></list-filter>
      <pagination v-model="pagination" :length="maxPage" slot="pagination"></pagination>
    </list-data>
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
    methods:
      displayData: () ->
        filteredData = this.filteredData(this.$store.state.list.fullList)
        start = (this.pagination.currentPage - 1) * this.pagination.pageSize
        end = start + this.pagination.pageSize
        this.maxPage = Math.ceil(filteredData.length / this.pagination.pageSize)
        return filteredData.slice(start, end)
      addAnime: (anime) ->
        this.$socket.emit('ADD_ANIME', anime, this.$store.state.list.filename)
      removeAnime: (anime) ->
        this.$socket.emit('REMOVE_ANIME', anime, this.$store.state.list.filename)
      syncFullList: () ->
        this.$socket.emit('SYNC_FULL_LIST')
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')

      this.syncFullList()
</script>

<style scoped>
  .list-picker-container {
    height: calc(100vh - 65px);
    overflow: auto;
  }
</style>