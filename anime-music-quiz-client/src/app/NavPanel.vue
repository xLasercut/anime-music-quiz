<template>
  <v-toolbar flat height="60px" max-height="60px">
    <v-toolbar-items>
      <nav-btn icon="mdi-theme-light-dark" @click="toggleTheme()"></nav-btn>
      <nav-btn icon="mdi-home" color="primary" id="home-btn" v-if="$route.path != '/'" @click="disconnect()"></nav-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <component :is="component"></component>
  </v-toolbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NavBtn from '../components/buttons/NavBtn.vue'
import ListPickerControls from '../list-picker/ListPickerControls.vue'
import LoginControls from '../login/LoginControls.vue'
import MiscControls from '../misc/MiscControls.vue'
import GameControls from '../game/GameControls.vue'
import { ComponentMap } from '../assets/interfaces'

let componentMap: ComponentMap = {
  '/list-picker': ListPickerControls,
  '/': LoginControls,
  '/misc': MiscControls,
  '/game': GameControls
}

@Component({
  components: { NavBtn }
})
export default class NavPanel extends Vue {
  disconnect(): void {
    this.$socket.client.close()
    this.$store.commit('DISCONNECT')
    this.$router.push('/')
  }

  toggleTheme(): void {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    localStorage.dark = this.$vuetify.theme.dark
  }

  get component() {
    return componentMap[this.$route.path]
  }

  mounted() {
    if (localStorage.dark) {
      this.$vuetify.theme.dark = (localStorage.dark === 'true')
    }
  }
}
</script>