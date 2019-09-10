<template>
  <v-toolbar-items>
    <nav-dialog :show-btn="$store.state.admin.admin" color="warning" icon="mdi-shield-account" id="admin-btn" @click="syncAdminInfo()">
      <v-row justify="center" no-gutters>
        <v-col cols="auto">
          Admin
        </v-col>
      </v-row>
      <kick-player :player-list="playerList"></kick-player>
      <name-changer :player-list="playerList"></name-changer>
      <database-operations />
      <system-message></system-message>
      <song-answer></song-answer>
    </nav-dialog>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import KickPlayer from './admin/KickPlayer.vue'
  import DatabaseOperations from './admin/DatabaseOperations.vue'
  import SystemMessage from './admin/SystemMessage.vue'
  import SongAnswer from './admin/SongAnswer.vue'
  import NameChanger from './admin/NameChanger.vue'
  import NavDialog from '../buttons/NavDialog.vue'

  export default
    components: { KickPlayer, SystemMessage, SongAnswer, DatabaseOperations, NameChanger, NavDialog }
    data: () ->
      playerList: {}
    methods:
      syncAdminInfo: () ->
        this.$socket.emit('ADMIN_SYNC_PLAYER_LIST', null, (playerList) =>
          @playerList = playerList
        )
</script>
