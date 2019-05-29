<template>
  <v-dialog v-if="$store.state.list.filename">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="success" depressed @click="$emit('open')">
        Show List
        <v-icon size="14pt" right>fas fa-list</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container grid-list-lg>
        <v-layout wrap>
          <v-flex xs12 class="text-xs-center">
            <icon-btn @click="download()" color="success" icon="fas fa-download">Download List</icon-btn>
          </v-flex>
        </v-layout>
        <list-filter v-model="filter"></list-filter>
        <list-data
          :data="displayData()"
          @remove-anime="$emit('remove-anime', $event)"
        ></list-data>
        <list-pagination
          v-model="currentPage" :length="maxPage"
        ></list-pagination>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import ListData from './ListData.vue'
  import ListFilter from './ListFilter.vue'
  import IconBtn from '../shared/IconBtn.vue'
  import ListPagination from './ListPagination.vue'

  export default {
    components: { ListData, ListFilter, IconBtn, ListPagination },
    data() {
      return {
        filter: {
          anime: '',
          song: ''
        },
        currentPage: 1,
        pageSize: 6,
        maxPage: 1
      }
    },
    methods: {
      filteredData () {
        if (this.filter.anime || this.filter.song) {
          var filtered = []
          var songfilter = new RegExp(this.filter.song, 'i')
          var animefilter = new RegExp(this.filter.anime, 'i')
          for (var anime of this.$store.state.list.userList) {
            if (animefilter.exec(anime.name) && songfilter.exec(anime.title)) {
              filtered.push(anime)
            }
          }
          return filtered
        }
        return this.$store.state.list.userList
      },
      displayData() {
        var start = (this.currentPage - 1) * this.pageSize
        var end = start + this.pageSize
        this.maxPage = Math.ceil(this.filteredData().length / this.pageSize)
        return this.filteredData().slice(start, end)
      },
      download() {
        var jsonstring = JSON.stringify(this.$store.state.list.userList)
        let blob = new Blob(this.encodeString(jsonstring), {type: 'application/octet-stream'})
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'my-list.json'
        link.click()
      },
      encodeString(s) {
        var out = []
        for ( var i = 0; i < s.length; i++ ) {
          out[i] = s.charCodeAt(i)
        }
        return [new Uint8Array(out)]
      }
    }
  }
</script>