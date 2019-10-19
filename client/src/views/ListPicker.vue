<template>
  <v-container fluid class="list-picker-container">
    <list-data
      :data="$store.state.list.fullList" id="main"
      @add-song="addSong($event)"
      @remove-song="removeSong($event)"
    >
    </list-data>
  </v-container>
</template>

<script lang="coffee">
  import ListData from '../list-picker/ListData.vue'
  import Notification from '../assets/mixins/notification.coffee'

  export default
    mixins: [ Notification ]
    components: { ListData }
    methods:
      addSong: (song) ->
        this.$socket.emit('ADD_SONG', song, this.$store.state.list.filename)
      removeSong: (song) ->
        this.$socket.emit('REMOVE_SONG', song, this.$store.state.list.filename)
      syncFullList: () ->
        this.$socket.emit('SYNC_FULL_LIST')
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')

      this.syncFullList()
</script>

<style scoped>
  .list-picker-container {
    height: calc(100vh - 65px);
    overflow: auto;
  }
</style>