<template>
  <v-container fluid class="list-picker-container">
    <v-row justify="center" v-if="$store.state.admin.admin">
      <v-col cols="auto">
        <icon-btn icon="mdi-plus" color="success" small @click="addSongToList()">Add Song</icon-btn>
      </v-col>
    </v-row>
    <list-data
      :data="$store.state.list.fullList" id="main"
      @add-song="addSong($event)"
      @remove-song="removeSong($event)"
      @edit-song="editSong($event)"
    >
    </list-data>
    <v-dialog v-model="showEdit">
      <item-edit
        v-model="songInfo"
        @cancel-edit="showEdit = false"
        @confirm-edit="confirmEdit()"
      ></item-edit>
    </v-dialog>
  </v-container>
</template>

<script lang="coffee">
  import ListData from '../list-picker/ListData.vue'
  import Notification from '../assets/mixins/notification.coffee'
  import ItemEdit from '../list-picker/ItemEdit.vue'
  import IconBtn from '../components/buttons/IconBtn.vue'

  export default
    mixins: [ Notification ]
    components: { ListData, ItemEdit, IconBtn }
    data: () ->
      showEdit: false
      songInfo: {
        songId: '',
        src: '',
        anime: [],
        title: '',
        artist: '',
        type: ''
      }
      editType: 'edit'
    methods:
      addSong: (song) ->
        this.$socket.emit('ADD_SONG', song, this.$store.state.list.filename)
      removeSong: (song) ->
        this.$socket.emit('REMOVE_SONG', song, this.$store.state.list.filename)
      syncFullList: () ->
        this.$socket.emit('SYNC_FULL_LIST')
      editSong: (song) ->
        this.editType = 'edit'
        this.songInfo = JSON.parse(JSON.stringify(song))
        this.showEdit = true
      confirmEdit: () ->
        if this.editType == 'edit'
          this.$socket.emit('ADMIN_EDIT_SONG_LIST', this.songInfo)
        else if this.editType == 'add'
          this.$socket.emit('ADMIN_ADD_SONG_TO_LIST', this.songInfo)
        this.showEdit = false
      addSongToList: () ->
        this.editType = 'add'
        this.songInfo = {
          songId: '',
          src: '',
          anime: [],
          title: '',
          artist: '',
          type: ''
        }
        this.showEdit = true
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