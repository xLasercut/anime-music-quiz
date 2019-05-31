<template>
  <v-app :dark="$store.state.dark">
    <nav-panel></nav-panel>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import NavPanel from './components/shared/NavPanel.vue'

  export default {
    name: 'App',
    components: { NavPanel }
  }
</script>
