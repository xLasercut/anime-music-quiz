<template>
  <v-toolbar>
    <v-toolbar-items>
      <nav-btn :icon="switchIcon" @click="$store.commit('TOGGLE_DARK_MODE')">
        {{switchLabel}}
      </nav-btn>
      <nav-btn color="primary" v-if="$route.path != '/'" icon="fas fa-home" @click="disconnect()">
        Home
      </nav-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <game-control></game-control>
    <list-picker-control></list-picker-control>
    <login-control></login-control>
  </v-toolbar>
</template>

<script lang="coffee">
  import GameControl from '../game/GameControl.vue'
  import ListPickerControl from '../list-picker/ListPickerControl.vue'
  import LoginControl from '../login/LoginControl.vue'
  import NavBtn from './NavBtn.vue'

  export default
    components: { GameControl, NavBtn, ListPickerControl, LoginControl }
    computed:
      switchLabel: () ->
        if this.$store.state.dark
          return 'Light'
        return 'Dark'
      switchIcon: () ->
        if this.$store.state.dark
          return 'fas fa-sun'
        return 'fas fa-moon'
    methods:
      disconnect: () ->
        this.$socket.close()
        this.$store.commit('list/DISCONNECT')
        this.$store.commit('game/DISCONNECT')
        this.$router.push('/')
    mounted: () ->
      if localStorage.dark
        dark = (localStorage.dark == 'true')
        if dark != this.$store.state.dark
          this.$store.commit('TOGGLE_DARK_MODE')
</script>