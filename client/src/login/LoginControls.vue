<template>
  <v-toolbar-items>
    <nav-btn
      color="success"
      icon="mdi-gamepad-variant"
      id="game-login-btn"
      @click="changeLogin('game')"
    ></nav-btn>
    <nav-btn
      color="primary"
      icon="mdi-playlist-music"
      id="list-login-btn"
      @click="changeLogin('list')"
    ></nav-btn>
    <nav-btn
      color="warning"
      icon="mdi-sticker-emoji"
      id="misc-login-btn"
      @click="changeLogin('misc')"
    ></nav-btn>
  </v-toolbar-items>
</template>

<script lang="ts">
import NavBtn from '../components/buttons/NavBtn.vue'
import { LoginMode } from '../assets/types'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    NavBtn
  },
  setup(_props, context) {
    function changeLogin(mode: LoginMode): void {
      context.root.$store.commit('CHANGE_LOGIN', mode)
    }

    return { changeLogin }
  }
})
</script>