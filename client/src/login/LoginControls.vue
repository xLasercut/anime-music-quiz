<template>
  <v-toolbar-items>
    <nav-btn color="success" icon="mdi-gamepad-variant" id="game-login-btn" @click="changeLogin('game')"></nav-btn>
    <nav-btn color="primary" icon="mdi-playlist-music" id="list-login-btn" @click="changeLogin('list')"></nav-btn>
    <nav-btn color="warning" icon="mdi-sticker-emoji" id="misc-login-btn" @click="changeLogin('misc')"></nav-btn>
  </v-toolbar-items>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBtn from '../components/buttons/NavBtn.vue'
import { LoginMode } from '../assets/types'

@Component({
  components: { NavBtn }
})
export default class LoginControls extends Vue {
  changeLogin(mode: LoginMode): void {
    this.$store.commit('CHANGE_LOGIN', mode)
  }
}
</script>