<template>
  <v-dialog v-model="show" :persistent="!$store.state.admin.admin" :transition="false">
    <template v-slot:activator="{ on }">
      <nav-btn
        color="primary" :activator="on"
        icon="mdi-playlist-music"
        id="game-song-select-btn"
        v-show="$store.state.admin.admin"
      ></nav-btn>
    </template>
    <v-card outlined>
      <v-card-title>
        <span>Song Select</span>
        <v-spacer></v-spacer>
        <timer-line :time="time" :max-time="maxTime" v-show="showTimer"></timer-line>
        <v-spacer></v-spacer>
        <icon-btn color="warning" icon="mdi-sync" @click="syncFullList()">Reload List</icon-btn>
      </v-card-title>
      <v-container fluid>
        <song-selector-data
          :data="displayData()"
          @select-song="selectSong($event)"
        >
          <list-filter v-model="filter" id="user" slot="filter"></list-filter>
          <pagination v-model="pagination" :length="maxPage" slot="pagination"></pagination>
        </song-selector-data>
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
  import Notification from '../../../assets/mixins/notification.coffee'
  import TimerLine from '../shared/TimerLine.vue'

  export default
    mixins: [ TableFilter, Notification ]
    components: { IconBtn, Pagination, NavBtn, SongSelectorData, TimerLine }
    data: () ->
      pagination: {
        currentPage: 1,
        pageSize: 5
      }
      maxPage: 1
      show: false
      songList: []
      countdown: null
      time: 15000
      maxTime: 15000
      showTimer: false
    sockets:
      SELECT_SONG: (time) ->
        this.show = true
        this.time = time * 1000
        this.maxTime = time * 1000
        this.startCountdown()
      SELECT_SONG_OVER: () ->
        this.show = false
        this.stopCountdown()
      RESET: () ->
        this.stopCountdown()
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
        this.$socket.emit('SONG_OVERRIDE', song, (data) =>
          this.notifySuccess("Song selected: #{data.name} - #{data.title}")
        )
      startCountdown: () ->
        this.showTimer = true
        this.countdown = setInterval( () =>
          this.time -= 200
          if this.time <= 0
            this.stopCountdown()
        , 200)
      stopCountdown: () ->
        clearInterval(this.countdown)
        this.showTimer = false
</script>