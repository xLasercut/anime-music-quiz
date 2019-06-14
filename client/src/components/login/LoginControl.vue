<template>
  <v-toolbar-items v-if="$route.path == '/'">
    <nav-btn color="success" icon="mdi-gamepad-variant" @click="$store.commit('CHANGE_MODE', 'game')">
      Game
    </nav-btn>
    <nav-btn color="info" icon="mdi-playlist-music" @click="$store.commit('CHANGE_MODE', 'list')">
      Song List
    </nav-btn>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import NavBtn from '../shared/NavBtn.vue'

  export default
    components: { NavBtn }
</script>