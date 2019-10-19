<template>
  <nav-dialog
    v-model="show" :persistent="!$store.state.admin.admin"
    color="primary" icon="mdi-playlist-music" id="game-song-select-btn"
    :show-btn="$store.state.admin.admin"
  >
    <v-row justify="space-between" no-gutters>
      <v-col cols="auto">
        Song Select
      </v-col>
      <v-col cols="4">
        <timer linear :max-time="maxTime" ref="timer"></timer>
      </v-col>
      <v-col cols="auto">
        <icon-btn color="warning" icon="mdi-sync" @click="syncFullList()">Reload List</icon-btn>
      </v-col>
    </v-row>
    <list-data :data="$store.state.list.fullList">
      <template #action="action">
        <icon-btn
          icon="mdi-plus" color="success" small @click="selectSong(action.props)"
          :id="`${action.props.songId}-select-btn`"
        >select</icon-btn>
      </template>
    </list-data>
  </nav-dialog>
</template>

<script lang="coffee">
  import IconBtn from '../../../components/buttons/IconBtn.vue'
  import Notification from '../../../assets/mixins/notification.coffee'
  import Timer from '../shared/Timer.vue'
  import ListData from '../../../list-picker/ListData.vue'
  import NavDialog from '../../../components/buttons/NavDialog.vue'

  export default
    mixins: [ Notification ]
    components: { IconBtn, NavDialog, ListData, Timer }
    data: () ->
      show: false
      songList: []
      maxTime: 20
    sockets:
      SELECT_SONG: (time) ->
        this.show = true
        this.maxTime = time
        setTimeout () =>
          this.$refs.timer.startCountdown()
        , 1
      SELECT_SONG_OVER: () ->
        this.$refs.timer.stopCountdown()
        this.show = false
      RESET: () ->
        if this.$refs.timer
          this.$refs.timer.stopCountdown()
    methods:
      syncFullList: () ->
        this.$socket.emit('SYNC_FULL_LIST')
      selectSong: (song) ->
        this.$socket.emit('SONG_OVERRIDE', song, (data) =>
          this.notifySuccess("Song selected: #{data.anime[0]} - #{data.title}")
        )
</script>