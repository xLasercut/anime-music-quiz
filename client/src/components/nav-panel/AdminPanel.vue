<template>
  <v-dialog width="800" v-model="show" :transition="false">
    <template v-slot:activator="{ on }">
      <v-toolbar-items>
        <nav-btn
          color="warning" @click="syncAdminInfo()"
          v-show="$store.state.admin.admin" :activator="on"
          icon="mdi-shield-account" id="admin-btn"
        ></nav-btn>
      </v-toolbar-items>
    </template>
    <v-card>
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            Admin
          </v-col>
        </v-row>
        <kick-player :player-list="playerList"></kick-player>
        <name-changer :player-list="playerList"></name-changer>
        <database-operations />
        <system-message></system-message>
        <song-answer></song-answer>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import KickPlayer from './admin/KickPlayer.vue'
  import DatabaseOperations from './admin/DatabaseOperations.vue'
  import SystemMessage from './admin/SystemMessage.vue'
  import SongAnswer from './admin/SongAnswer.vue'
  import NavBtn from '../buttons/NavBtn.vue'
  import NameChanger from './admin/NameChanger.vue'

  export default
    components: { KickPlayer, SystemMessage, SongAnswer, DatabaseOperations, NavBtn, NameChanger }
    data: () ->
      show: false,
      playerList: {}
    methods:
      syncAdminInfo: () ->
        this.$socket.emit('ADMIN_SYNC_PLAYER_LIST', null, (playerList) =>
          @playerList = playerList
        )
</script>
