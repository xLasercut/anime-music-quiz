<template>
  <v-dialog v-if="$store.state.list.filename">
    <template v-slot:activator="{ on }">
      <nav-btn
        color="success" :activator="on" @click="syncUserList()"
        icon="fas fa-list"
      ></nav-btn>
    </template>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex xs12 class="text-xs-center">
            <icon-btn @click="download()" color="success" icon="fas fa-download">Download List</icon-btn>
          </v-flex>
        </v-layout>
        <list-filter v-model="filter"></list-filter>
        <list-data
          :data="displayData()"
          @remove-anime="removeAnime($event)"
        ></list-data>
        <list-pagination
          v-model="pagination" :length="maxPage"
        ></list-pagination>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import ListData from './ListData.vue'
  import IconBtn from '../shared/IconBtn.vue'
  import ListPagination from './ListPagination.vue'
  import NavBtn from '../shared/NavBtn.vue'
  import TableFilter from '../../assets/mixins/table-filter.coffee'

  export default
    mixins: [ TableFilter ]
    components: { ListData, IconBtn, ListPagination, NavBtn }
    data: () ->
      pagination: {
        currentPage: 1,
        pageSize: 5
      }
      maxPage: 1
    methods:
      displayData: () ->
        filteredData = this.filteredData(this.$store.state.list.userList)
        start = (this.pagination.currentPage - 1) * this.pagination.pageSize
        end = start + this.pagination.pageSize
        this.maxPage = Math.ceil(filteredData.length / this.pagination.pageSize)
        return filteredData.slice(start, end)
      download: () ->
        jsonstring = JSON.stringify(this.$store.state.list.userList, null, 2)
        blob = new Blob([jsonstring], {type: 'text/plain'})
        link = document.createElement('a')
        document.body.appendChild(link)
        link.setAttribute("type", "hidden")
        link.href = window.URL.createObjectURL(blob)
        link.download = 'my-list.json'
        link.click()
      syncUserList: () ->
        this.$socket.emit('SYNC_USER_LIST', this.$store.state.list.filename)
      removeAnime: (anime) ->
        this.$store.commit('list/REMOVE_ANIME', anime)
        this.$socket.emit('UPDATE_USER_LIST', this.$store.state.list.userList, this.$store.state.list.filename)
</script>