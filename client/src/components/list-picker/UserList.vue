<template>
  <v-dialog v-if="$store.state.list.filename">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="success" flat @click="$emit('open')" class="user-list-btn">
        Show List
        <v-icon size="12pt" right>fas fa-list</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container fluid grid-list-xs>
        <v-layout wrap>
          <v-flex xs12 class="text-xs-center">
            <icon-btn @click="download()" color="success" icon="fas fa-download">Download List</icon-btn>
          </v-flex>
        </v-layout>
        <list-filter v-model="filter"></list-filter>
        <list-data
          :data="displayData()"
          @remove-anime="$store.commit('list/REMOVE_ANIME', $event)"
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

  export default
    components: { ListData, ListFilter, IconBtn, ListPagination }
    data: () ->
      filter: {
        anime: '',
        song: ''
      },
      currentPage: 1,
      pageSize: 6,
      maxPage: 1
    methods:
      filteredData: () ->
        songfilter = ''
        animefilter = ''
        if this.filter.song
          songfilter = this.filter.song.trim().toLowerCase()
        if this.filter.anime
          animefilter = this.filter.anime.trim().toLowerCase()
        return this.$store.state.list.userList.filter((anime) =>
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
      download: () ->
        jsonstring = JSON.stringify(this.$store.state.list.userList, null, 2)
        blob = new Blob([jsonstring], {type: 'text/plain'})
        link = document.createElement('a')
        document.body.appendChild(link)
        link.setAttribute("type", "hidden")
        link.href = window.URL.createObjectURL(blob)
        link.download = 'my-list.json'
        link.click()
</script>

<style scoped>
  .user-list-btn {
    border-radius: 0;
  }
</style>