<template>
  <v-toolbar-items v-if="$route.path == '/'">
    <nav-btn color="success" icon="mdi-gamepad-variant" @click="$store.commit('CHANGE_MODE', 'game')" id="game-btn">
      Game
    </nav-btn>
    <nav-btn color="info" icon="mdi-playlist-music" @click="$store.commit('CHANGE_MODE', 'list')" id="list-btn">
      Song List
    </nav-btn>
    <nav-btn color="warning" icon="mdi-sticker-emoji" @click="$store.commit('CHANGE_MODE', 'misc')" id="misc-btn">
      Misc
    </nav-btn>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import NavBtn from '../shared/NavBtn.vue'

  export default
    components: { NavBtn }
</script>