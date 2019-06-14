<template>
  <v-dialog width="600" v-model="show">
    <template v-slot:activator="{ on }">
      <nav-btn
        color="warning" @click="syncAdminInfo()"
        v-if="$store.state.admin.admin" :activator="on"
        icon="mdi-shield-account"
      ></nav-btn>
    </template>
    <v-card>
      <v-container grid-list-lg>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            Admin
          </v-flex>
        </v-layout>
        <kick-player :player-list="playerList"></kick-player>
        <name-changer :player-list="playerList"></name-changer>
        <database-reload></database-reload>
        <system-message></system-message>
        <song-answer></song-answer>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import KickPlayer from './admin/KickPlayer.vue'
  import DatabaseReload from './admin/DatabaseReload.vue'
  import SystemMessage from './admin/SystemMessage.vue'
  import SongAnswer from './admin/SongAnswer.vue'
  import NavBtn from './NavBtn.vue'
  import NameChanger from './admin/NameChanger.vue'

  export default
    components: { KickPlayer, SystemMessage, SongAnswer, DatabaseReload, NavBtn, NameChanger }
    data: () ->
      show: false,
      playerList: {}
    methods:
      syncAdminInfo: () ->
        this.$socket.emit('ADMIN_SYNC_PLAYER_LIST', null, (playerList) =>
          @playerList = playerList
        )
</script>
