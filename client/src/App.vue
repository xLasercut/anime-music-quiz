<template>
  <v-app>
    <game-notification></game-notification>
    <nav-panel></nav-panel>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer height="35">
      <div class="flex-grow-1"></div>
      <div>&copy; {{ new Date().getFullYear() }} Lasercut</div>
    </v-footer>
  </v-app>
</template>

<script lang="coffee">
  import NavPanel from './components/nav-panel/NavPanel.vue'
  import GameNotification from './components/GameNotification.vue'
  import Notification from './assets/mixins/notification.coffee'

  export default
    name: 'App'
    components: { NavPanel, GameNotification }
    mixins: [ Notification ]
    sockets:
      SYSTEM_NOTIFICATION: (type, message) ->
        if type == 'error'
          this.notifyError(message)
        else if type == 'success'
          this.notifySuccess(message)
        else if type == 'warning'
          this.notifyWarning(message)
</script>