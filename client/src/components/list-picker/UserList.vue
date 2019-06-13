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
          v-model="currentPage" :length="maxPage"
        ></list-pagination>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import ListData from './ListData.vue'
  import ListFilter from './ListFilter.vue'
  import IconBtn from '../shared/IconBtn.vue'
  import ListPagination from './ListPagination.vue'
  import NavBtn from '../shared/NavBtn.vue'

  export default
    components: { ListData, ListFilter, IconBtn, ListPagination, NavBtn }
    data: () ->
      filter: {
        anime: '',
        song: '',
        type: 'All'
      },
      currentPage: 1,
      pageSize: 6,
      maxPage: 1
    methods:
      filteredData: () ->
        songfilter = ''
        animefilter = ''
        typefilter = ''
        if this.filter.song
          songfilter = this.filter.song.trim().toLowerCase()
        if this.filter.anime
          animefilter = this.filter.anime.trim().toLowerCase()
        if this.filter.type and this.filter.type != 'All'
          typefilter = this.filter.type.trim().toLowerCase()
        return this.$store.state.list.userList.filter((anime) =>
          names = "#{anime.name},#{anime.altName.join(',')}".toLowerCase()
          songName = anime.title.toLowerCase()
          type = anime.type.toLowerCase()
          if names.includes(animefilter) and songName.includes(songfilter) and type.includes(typefilter)
            return anime
        )
      displayData: () ->
        start = (this.currentPage - 1) * this.pageSize
        end = start + this.pageSize
        this.maxPage = Math.ceil(this.filteredData().length / this.pageSize)
        return this.filteredData().slice(start, end)
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
