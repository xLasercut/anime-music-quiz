<template>
  <el-main>
    <el-row type="flex" justify="center">
      <el-col :span="12" v-show="disabled()">
        <el-input v-model.trim="serverUrl">
          <span slot="prepend">Server URL</span>
          <el-button slot="append" @click="connect()">Connect</el-button>
        </el-input>
      </el-col>
      <el-col :span="12" v-show="!disabled()">
        <el-button @click="reload()" type="warning" icon="el-icon-refresh">Reload Full List</el-button>
        <el-button @click="dialog = true" type="success">Show List</el-button>
      </el-col>
    </el-row>
    <list-filter v-model="filter"></list-filter>
    <list-data
      :data="displayData()" :user-list="userList"
      @add-anime="addAnime($event)"
      @remove-anime="removeAnime($event)"
    ></list-data>
    <el-row>
      <el-pagination
        background
        layout="prev, pager, next, jumper, ->, total"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredData().length"
        @current-change="currentPage = $event"
      ></el-pagination>
    </el-row>
    <user-list
      v-model="dialog" :data="userList"
      @remove-anime="removeAnime($event)"
    ></user-list>
  </el-main>
</template>

<script>
  import io from 'socket.io-client'
  import { Loading } from 'element-ui'
  import ListFilter from '../components/list-picker/ListFilter.vue'
  import ListData from '../components/list-picker/ListData.vue'
  import UserList from '../components/list-picker/UserList.vue'

  var default_server = ''
  if (process.env.NODE_ENV === 'development') {
    default_server = 'http://localhost:3001'
  }

  export default {
    components: {
      ListFilter, ListData, UserList
    },
    data() {
      return {
        serverUrl: default_server,
        socket: null,
        animes: [],
        pageSize: 10,
        currentPage: 1,
        filter: {
          anime: '',
          song: ''
        },
        userList: [],
        dialog: false
      }
    },
    methods: {
      disabled() {
        if (this.socket) {
          return false
        }
        return true
      },
      connect() {
        this.socket = io(this.serverUrl)
        this.reload()
      },
      reload() {
        var loadingInstance = Loading.service()
        this.socket.emit('GET_ALL_ANIME')
        this.socket.on('GET_ALL_ANIME', (data) => {
          this.animes = data
          loadingInstance.close()
        })
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
        this.userList.push(anime)
      },
      removeAnime(anime) {
        for (var i = 0; i < this.userList.length; i++) {
          if (anime.src === this.userList[i].src && anime.name === this.userList[i].name) {
            this.userList.splice(i, 1)
          }
        }
      }
    }
  }
</script>