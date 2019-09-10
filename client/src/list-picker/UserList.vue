<template>
  <nav-dialog
    v-if="$store.state.list.filename" v-model="show"
    color="success" icon="mdi-playlist-music" id="user-list-btn"
    @click="syncUserList()"
  >
    <v-row justify="space-between" no-gutters>
      <v-col cols="auto">
        {{$store.state.list.filename}}
      </v-col>
      <v-col cols="auto">
        <icon-btn @click="download()" color="success" icon="mdi-download">Download List</icon-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn icon text small @click="show = false" id="close-user-list-btn"><v-icon>mdi-close</v-icon></v-btn>
      </v-col>
    </v-row>
    <list-data :data="$store.state.list.userList" id="user" @remove-anime="removeAnime($event)"></list-data>
  </nav-dialog>
</template>

<script lang="coffee">
  import ListData from './ListData.vue'
  import IconBtn from '../components/buttons/IconBtn.vue'
  import NavBtn from '../components/buttons/NavBtn.vue'
  import NavDialog from '../components/buttons/NavDialog.vue'

  export default
    components: { ListData, IconBtn, NavDialog }
    data: () ->
      show: false
    methods:
      download: () ->
        jsonstring = JSON.stringify(this.$store.state.list.userList, null, 2)
        blob = new Blob([jsonstring], {type: 'text/plain'})
        link = document.createElement('a')
        document.body.appendChild(link)
        link.setAttribute("type", "hidden")
        link.href = window.URL.createObjectURL(blob)
        link.download = 'my-list.json'
        link.click()
      syncUserList: () ->
        this.$socket.emit('SYNC_USER_LIST', this.$store.state.list.filename)
      removeAnime: (anime) ->
        this.$socket.emit('REMOVE_ANIME', anime, this.$store.state.list.filename)
</script>