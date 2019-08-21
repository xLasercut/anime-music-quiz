<template>
  <v-dialog v-model="show">
    <template v-slot:activator="{ on }">
      <nav-btn
        color="primary" :activator="on"
        icon="mdi-playlist-music"
      ></nav-btn>
    </template>
    <v-card>
      <v-card-title>
        <span>Song Select</span>
        <v-spacer></v-spacer>
        <icon-btn color="warning" icon="mdi-sync" @click="syncFullList()">Reload List</icon-btn>
        <v-spacer></v-spacer>
        <v-btn icon text small @click="show = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-container fluid>
        <list-filter v-model="filter" id="user"></list-filter>
        <song-selector-data
          :data="displayData()"
          @select-song="selectSong($event)"
        ></song-selector-data>
        <pagination
          v-model="pagination" :length="maxPage"
        ></pagination>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import IconBtn from '../../../components/buttons/IconBtn.vue'
  import Pagination from '../../../components/Pagination.vue'
  import NavBtn from '../../../components/buttons/NavBtn.vue'
  import TableFilter from '../../../list-picker/mixins/table-filter.coffee'
  import SongSelectorData from './song-selector/SongSelectorData.vue'

  export default
    mixins: [ TableFilter ]
    components: { IconBtn, Pagination, NavBtn, SongSelectorData }
    data: () ->
      pagination: {
        currentPage: 1,
        pageSize: 5
      }
      maxPage: 1
      show: false
      songList: []
    methods:
      displayData: () ->
        filteredData = this.filteredData(this.$store.state.list.fullList)
        start = (this.pagination.currentPage - 1) * this.pagination.pageSize
        end = start + this.pagination.pageSize
        this.maxPage = Math.ceil(filteredData.length / this.pagination.pageSize)
        return filteredData.slice(start, end)
      syncFullList: () ->
        this.$socket.emit('SYNC_FULL_LIST')
      selectSong: (song) ->
        console.log(song)
</script>