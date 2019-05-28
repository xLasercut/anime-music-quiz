<template>
  <v-container fluid grid-list-lg>
    <v-layout wrap>
      <v-flex xs12 class="text-xs-center">
        <icon-btn color="primary" icon="fas fa-home" @click="$router.push('/')">Home</icon-btn>
        <icon-btn color="warning" icon="fas fa-sync" @click="reload()">Reload Full List</icon-btn>
        <user-list @remove-anime="removeAnime($event)" @open="updateUserList()"></user-list>
      </v-flex>
    </v-layout>
    <list-filter v-model="filter"></list-filter>
    <list-data
      :data="displayData()"
      @add-anime="addAnime($event)"
      @remove-anime="removeAnime($event)"
      v-if="!loading"
    ></list-data>
    <v-layout>
      <v-flex xs12 class="text-xs-center" v-if="loading">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <list-pagination v-model="currentPage" :length="maxPage"></list-pagination>
  </v-container>
</template>

<script>
  import io from 'socket.io-client'
  import IconBtn from '../components/shared/IconBtn.vue'
  import ListFilter from '../components/list-picker/ListFilter.vue'
  import ListData from '../components/list-picker/ListData.vue'
  import ListPagination from '../components/list-picker/ListPagination.vue'
  import UserList from '../components/list-picker/UserList.vue'

   export default {
    components: { ListFilter, ListData, UserList, ListPagination, IconBtn },
    data() {
      return {
        socket: this.$store.state.list.socket,
        animes: [],
        pageSize: 10,
        currentPage: 1,
        filter: {
          anime: '',
          song: ''
        },
        loading: false,
        maxPage: 1
      }
    },
    methods: {
      reload() {
        this.loading = true
        this.socket.emit('GET_ALL_ANIME')
      },
      filteredData () {
        if (this.filter.anime || this.filter.song) {
          var filtered = []
          var songfilter = new RegExp(this.filter.song, 'i')
          var animefilter = new RegExp(this.filter.anime, 'i')
          for (var anime of this.animes) {
            if (animefilter.exec(anime.name) && songfilter.exec(anime.title)) {
              filtered.push(anime)
            }
          }
          return filtered
        }
        return this.animes
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
      },
      updateUserList() {
        this.socket.emit('GET_USER_LIST')
      }
    },
    mounted() {
      if (this.socket) {
        this.reload()
        this.updateUserList()

        this.socket.on('GET_ALL_ANIME', (data) => {
          this.animes = data
          this.loading = false
        })

        this.socket.on('GET_USER_LIST', (list) => {
          this.$store.commit('list/UPDATE_USER_LIST', list)
        })
      }
      else {
        this.$router.push('/')
      }
    }
  }
</script>