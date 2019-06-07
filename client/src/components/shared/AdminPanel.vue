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
        <v-layout justify-center>
          <v-flex shrink>
            <icon-btn color="warning" icon="fas fa-sync" @click="reloadDb()">Reload Database</icon-btn>
          </v-flex>
        </v-layout>
        <system-message></system-message>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import KickPlayer from './admin/KickPlayer.vue'
  import SystemMessage from './admin/SystemMessage.vue'
  import IconBtn from './IconBtn.vue'

  export default
    components: { KickPlayer, IconBtn, SystemMessage }
    data: () ->
      show: false,
      playerList: {}
    methods:
      reloadDb: () ->
        this.$socket.emit('ADMIN_RELOAD_DATABASE')
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