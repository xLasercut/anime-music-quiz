<template>
  <el-main>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-button @click="reload()" type="warning" icon="el-icon-refresh">Reload Full List</el-button>
        <el-button @click="dialog = true" type="success">Show List</el-button>
      </el-col>
    </el-row>
    <list-filter v-model="filter"></list-filter>
    <list-data
      :data="displayData()"
      @add-anime="addAnime($event)"
      @remove-anime="removeAnime($event)"
    ></list-data>
    <el-row>
      <el-pagination
        background
        layout="prev, pager, next, jumper, ->, total"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="filteredData().length"
      ></el-pagination>
    </el-row>
    <user-list
      v-model="dialog"
      @remove-anime="removeAnime($event)"
      @open="updateUserList()"
    ></user-list>
  </el-main>
</template>

<script>
  import io from 'socket.io-client'
  import { Loading } from 'element-ui'
  import ListFilter from '../components/list-picker/ListFilter.vue'
  import ListData from '../components/list-picker/ListData.vue'
  import UserList from '../components/list-picker/UserList.vue'

   export default {
    components: { ListFilter, ListData, UserList },
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
        dialog: false,
        loading: null
      }
    },
    methods: {
      reload() {
        this.loading = Loading.service()
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
          this.loading.close()
        })

        this.socket.on('GET_USER_LIST', (list) => {
          this.$store.commit('list/UPDATE_USER_LIST', list)
        })
      }
      else {
        this.$router.push('home')
      }
    }
  }
</script>