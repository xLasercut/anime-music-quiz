<template>
  <v-container fluid>
    <v-card>
      <v-container fluid>
        <v-row justify="center">
          <v-col>

          </v-col>
        </v-row>
        <song-list-table
          :data="$store.state.list.songList" id="main" show-edit
          @add-user-song="addUserSong($event)"
          @remove-user-song="removeUserSong($event)"
          @edit-song="editSong($event)"
          @delete-song="deleteSong($event)"
        ></song-list-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SongListTable from '../list-picker/SongListTable.vue'
import { SongObj } from '../assets/interfaces'

@Component({
  components: { SongListTable }
})
export default class ListPicker extends Vue {
  addUserSong(song: SongObj): void {
    this.$socket.client.emit('ADD_USER_SONG', song, this.$store.state.list.user)
  }

  removeUserSong(song: SongObj): void {
    this.$socket.client.emit('REMOVE_USER_SONG', song, this.$store.state.list.user)
  }

  mounted() {
    if (this.$socket.disconnected) {
      this.$router.push('/')
    }
  }
}
</script>