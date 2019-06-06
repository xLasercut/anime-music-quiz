<template>
  <v-dialog width="600" v-model="show">
    <template v-slot:activator="{ on }">
      <v-btn class="admin-btn" v-on="on" color="warning" flat v-show="$store.state.game.admin">
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
        <kick-player></kick-player>
        <v-layout justify-center>
          <v-flex shrink>
            <icon-btn color="warning" icon="fas fa-sync" @click="reloadDb()">Reload Database</icon-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import KickPlayer from './admin/KickPlayer.vue'
  import IconBtn from '../../shared/IconBtn.vue'

  export default
    components: { KickPlayer, IconBtn }
    data: () ->
      show: false
    methods:
      reloadDb: () ->
        this.$socket.emit('ADMIN_RELOAD_DATABASE')
</script>

<style scoped>
  .admin-btn {
    border-radius: 0;
  }
</style>