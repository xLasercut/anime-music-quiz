<template>
  <v-toolbar-items v-if="$route.path == '/'">
    <nav-btn color="success" icon="fas fa-gamepad" @click="$store.commit('CHANGE_MODE', 'game')">
      Game
    </nav-btn>
    <nav-btn color="info" icon="fas fa-list" @click="$store.commit('CHANGE_MODE', 'list')">
      Song List
    </nav-btn>
  </v-toolbar-items>
</template>

<script>
  import NavBtn from '../shared/NavBtn.vue'

  export default {
    components: { NavBtn }
  }
</script>