<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar flat height="60px">
        <v-toolbar-items>
          <nav-btn icon="mdi-theme-light-dark" @click="$store.commit('TOGGLE_DARK_MODE')">
          </nav-btn>
          <nav-btn color="primary" v-if="$route.path != '/'" icon="mdi-home" @click="disconnect()" id="home-btn">
            Home
          </nav-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <admin-panel></admin-panel>
        <game-control></game-control>
        <list-picker-control></list-picker-control>
        <login-control></login-control>
        <misc-control></misc-control>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import GameControl from '../../game/game/GameControl.vue'
  import ListPickerControl from '../../list-picker/ListPickerControl.vue'
  import LoginControl from '../../login/LoginControl.vue'
  import MiscControl from '../../misc/MiscControl.vue'
  import NavBtn from '../buttons/NavBtn.vue'
  import AdminPanel from './AdminPanel.vue'

  export default
    components: { GameControl, NavBtn, ListPickerControl, LoginControl, MiscControl, AdminPanel }
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