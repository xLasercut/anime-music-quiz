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

<script>
  import ListFilter from '../components/list-picker/ListFilter.vue'
  import ListData from '../components/list-picker/ListData.vue'
  import ListPagination from '../components/list-picker/ListPagination.vue'
  import Loading from '../components/shared/Loading.vue'

   export default {
    components: { ListFilter, ListData, ListPagination, Loading },
    data() {
      return {
        socket: this.$store.state.list.socket,
        pageSize: 8,
        currentPage: 1,
        filter: {
          anime: '',
          song: ''
        },
        maxPage: 1
      }
    },
    methods: {
      filteredData () {
        var filtered = []
        var songfilter = ''
        var animefilter = ''
        if (this.filter.song) {
          songfilter = this.filter.song.trim().toLowerCase()
        }
        if (this.filter.anime) {
          animefilter = this.filter.anime.trim().toLowerCase()
        }
        return this.$store.state.list.fullList.filter((anime) => {
          var names = `${anime.name},${anime.altName.join(',')}`.toLowerCase()
          var songName = anime.title.toLowerCase()
          if (names.includes(animefilter) && songName.includes(songfilter)) {
            return anime
          }
        })
      },
      displayData() {
        var start = (this.currentPage - 1) * this.pageSize
        var end = start + this.pageSize
        this.maxPage = Math.ceil(this.filteredData().length / this.pageSize)
        return this.filteredData().slice(start, end)
      },
      addAnime(anime) {
        this.$store.commit('list/ADD_ANIME', anime)
      },
      removeAnime(anime) {
        this.$store.commit('list/REMOVE_ANIME', anime)
      }
    },
    mounted() {
      if (this.socket) {
        this.$store.commit('list/SYNC_FULL_LIST')

        this.socket.on('SYNC_USER_LIST', (list, filename) => {
          if (this.$store.state.list.filename === filename) {
            this.$store.commit('list/SYNC_USER_LIST', list)
          }
        })
      }
      else {
        this.$router.push('/')
      }
    }
  }
</script>