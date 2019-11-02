<template>
  <v-toolbar-items>
    <dialog-btn nav icon="mdi-shield-account" color="warning" v-model="show" v-if="$store.state.client.admin" @click="reload()">
      <v-row justify="space-between" no-gutters>
        <v-col cols="auto">Admin</v-col>
        <v-col cols="auto"><dialog-close-btn @click="show = false"></dialog-close-btn></v-col>
      </v-row>
      <reload-db></reload-db>
      <system-message></system-message>
      <player-options></player-options>
      <song-answer></song-answer>
    </dialog-btn>
  </v-toolbar-items>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DialogBtn from '../../components/buttons/DialogBtn.vue'
import DialogCloseBtn from '../../components/buttons/DialogCloseBtn.vue'
import ReloadDb from './admin-controls/ReloadDb.vue'
import SystemMessage from './admin-controls/SystemMessage.vue'
import PlayerOptions from './admin-controls/PlayerOptions.vue'
import SongAnswer from './admin-controls/SongAnswer.vue'

@Component({
  components: { DialogBtn, DialogCloseBtn, ReloadDb, SystemMessage, PlayerOptions, SongAnswer }
})
export default class AdminControls extends Vue {
  show = false

  reload(): void {
    this.$socket.client.emit('GET_PLAYER_LIST')
  }
}
</script>