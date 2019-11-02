<template>
  <dialog-btn nav icon="mdi-playlist-music" color="primary" id="game-song-select-btn" v-model="show" :persistent="persistent" :show-btn="$store.state.client.admin">
    <v-row justify="space-between" no-gutters>
      <v-col cols="auto">Song Select</v-col>
      <song-select-timer ref="timer" :maxTime="$store.state.game.settings.selectTime"></song-select-timer>
      <v-col cols="auto"><icon-btn small color="warning" icon="mdi-sync" @click="reload()">Reload</icon-btn></v-col>
    </v-row>
    <song-list-table
      :data="$store.state.list.songList" id="select"
    >
      <template #action="action">
        <table-btn icon="mdi-playlist-plus" color="success" @click="selectSong(action.props)" :id="`${action.props.songId}-select-btn`"></table-btn>
      </template>
    </song-list-table>
  </dialog-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DialogBtn from '../../components/buttons/DialogBtn.vue'
import IconBtn from '../../components/buttons/IconBtn.vue'
import SongListTable from '../../list-picker/SongListTable.vue'
import TableBtn from '../../components/buttons/TableBtn.vue'
import { SongObj } from '../../assets/interfaces'
import SongSelectTimer from './song-select-dialog/SongSelectTimer.vue'
import { Socket } from 'vue-socket.io-extended'

@Component({
  components: { DialogBtn, SongListTable, TableBtn, IconBtn, SongSelectTimer }
})
export default class SongSelectDialog extends Vue {
  $refs!: {
    timer: SongSelectTimer
  }

  percentage = 50
  show = false

  @Socket('SELECT_SONG')
  onSelectSong(): void {
    this.show = true
    this.$nextTick(() => {
      this.$refs.timer.startCountdown()
    })
  }

  @Socket('SELECT_SONG_OVER')
  selectSongOver(): void {
    this.$refs.timer.stopCountdown()
    this.show = false
  }

  selectSong(song: SongObj): void {
    this.$socket.client.emit('SONG_OVERRIDE', song)
    this.show = false
  }

  reload(): void {
    this.$socket.client.emit('GET_FULL_LIST')
  }

  get persistent(): boolean {
    return (!this.$store.state.client.admin)
  }
}
</script>