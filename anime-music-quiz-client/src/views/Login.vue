<template>
  <v-container>
    <component :is="component"></component>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ListLogin from '../login/ListLogin.vue'
import MiscLogin from '../login/MiscLogin.vue'
import GameLogin from '../login/GameLogin.vue'
import { ComponentMap } from '../assets/interfaces'

let componentMap: ComponentMap = {
  'game': GameLogin,
  'list': ListLogin,
  'misc': MiscLogin
}

@Component({})
export default class Login extends Vue {

  get component() {
    return componentMap[this.$store.state.client.loginMode]
  }

  mounted() {
    if (this.$socket.connected) {
      this.$socket.client.close()
    }
    this.$store.commit('DISCONNECT')
  }
}
</script>