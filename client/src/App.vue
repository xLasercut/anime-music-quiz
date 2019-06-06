<template>
  <v-app :dark="$store.state.dark">
    <game-notification></game-notification>
    <nav-panel></nav-panel>
    <router-view></router-view>
  </v-app>
</template>

<script lang="coffee">
  import NavPanel from './components/shared/NavPanel.vue'
  import GameNotification from './components/shared/GameNotification.vue'

  export default
    name: 'App'
    components: { NavPanel, GameNotification }
</script>