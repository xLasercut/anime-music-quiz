<template>
  <v-dialog width="600" v-model="show">
    <template v-slot:activator="{ on }">
      <v-btn
        class="admin-btn" v-on="on" color="warning"
        flat @click="syncAdminInfo()" v-if="$store.state.admin.admin"
      >
        Admin
        <v-icon size="12pt" right>fas fa-user-shield</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container grid-list-lg>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            Admin
          </v-flex>
        </v-layout>
        <kick-player :player-list="playerList"></kick-player>
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

  export default
    components: { KickPlayer, SystemMessage, SongAnswer, DatabaseReload }
    data: () ->
      show: false,
      playerList: {}
    methods:
      syncAdminInfo: () ->
        this.$socket.emit('ADMIN_SYNC_PLAYER_LIST', null, (playerList) =>
          @playerList = playerList
        )
</script>

<style scoped>
  .admin-btn {
    border-radius: 0;
  }
</style>