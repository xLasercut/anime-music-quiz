<template>
  <v-dialog v-if="$store.state.list.filename" v-model="show">
    <template v-slot:activator="{ on }">
      <nav-btn
        color="success" :activator="on" @click="syncUserList()"
        icon="mdi-playlist-music" id="user-list-btn"
      ></nav-btn>
    </template>
    <v-card>
      <v-card-title>
        <span>{{$store.state.list.filename}}</span>
        <v-spacer></v-spacer>
        <icon-btn @click="download()" color="success" icon="mdi-download">Download List</icon-btn>
        <v-spacer></v-spacer>
        <v-btn icon flat small @click="show = false" id="close-user-list-btn"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-container fluid grid-list-lg>
        <list-filter v-model="filter" id="user"></list-filter>
        <list-data
          :data="displayData()" id="user"
          @remove-anime="removeAnime($event)"
        ></list-data>
        <pagination
          v-model="pagination" :length="maxPage"
        ></pagination>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import ListData from './ListData.vue'
  import IconBtn from '../components/buttons/IconBtn.vue'
  import Pagination from '../components/Pagination.vue'
  import NavBtn from '../components/buttons/NavBtn.vue'
  import TableFilter from './mixins/table-filter.coffee'

  export default
    mixins: [ TableFilter ]
    components: { ListData, IconBtn, Pagination, NavBtn }
    data: () ->
      pagination: {
        currentPage: 1,
        pageSize: 5
      }
      maxPage: 1
      show: false
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
        this.$socket.emit('REMOVE_ANIME', anime, this.$store.state.list.filename)
</script>