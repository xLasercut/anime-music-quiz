<template>
  <v-app :dark="$store.state.dark">
    <router-view></router-view>
    <navigation-drawer></navigation-drawer>
    <v-btn fab fixed left top color="primary" @click="$store.commit('TOGGLE_DRAWER')">
      <v-icon>fas fa-wrench</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
  import NavigationDrawer from './components/shared/NavigationDrawer.vue'

  export default {
    name: 'App',
    components: { NavigationDrawer }

  }
</script>
