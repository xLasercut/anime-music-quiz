<template>
  <dialog-btn
    nav icon="mdi-playlist-music"
    color="success" id="user-list-btn"
    @click="getUserList()" v-if="$store.state.list.user"
    v-model="show"
  >
    <v-row justify="space-between" no-gutters>
      <v-col cols="auto">
        {{$store.state.list.user}}
      </v-col>
      <v-col cols="auto">
        <icon-btn
          color="success" icon="mdi-download" :href="downloadHref()"
          :download="`${$store.state.list.user}.json`"
        >Download</icon-btn>
      </v-col>
      <v-col cols="auto">
        <dialog-close-btn id="close-user-list-btn" @click="show = false"></dialog-close-btn>
      </v-col>
    </v-row>
    <song-list-table
      :data="userData()" id="user"
      @remove-user-song="removeUserSong($event)"
    ></song-list-table>
  </dialog-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DialogBtn from '../components/buttons/DialogBtn.vue'
import IconBtn from '../components/buttons/IconBtn.vue'
import DialogCloseBtn from '../components/buttons/DialogCloseBtn.vue'
import SongListTable from './SongListTable.vue'
import { SongObj } from '../assets/interfaces'
import { Test } from '../../../test/test'

@Component({
  components: { DialogBtn, SongListTable, IconBtn, DialogCloseBtn }
})
export default class UserList extends Vue {
  show = false

  userData(): Array<SongObj> {
    return this.$store.state.list.songList.filter((song: SongObj): SongObj | undefined => {
      if (this.$store.state.list.userList.has(song.songId)) {
        return song
      }
    })
  }

  getUserList(): void {
    this.$socket.client.emit('GET_USER_LIST', this.$store.state.list.user)
    let test = new Test()
    test.test()
  }

  removeUserSong(song: SongObj): void {
    this.$socket.client.emit('REMOVE_USER_SONG', song, this.$store.state.list.user)
  }

  downloadHref(): string {
    let serializedData = JSON.stringify(this.userData(), null, 2)
    let blob = new Blob([serializedData], { type: 'text/plain' })
    return window.URL.createObjectURL(blob)
  }
}
</script>