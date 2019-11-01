<template>
  <v-app>
    <game-notification></game-notification>
    <nav-panel></nav-panel>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NavPanel from '@/app/NavPanel.vue'
import GameNotification from '@/app/GameNotification.vue'
import { Socket } from 'vue-socket.io-extended'
import { BannerColor } from '@/assets/types'
import { sendNotification } from '@/assets/notification'

@Component({
  components: { NavPanel, GameNotification }
})
export default class App extends Vue {
  @Socket('SYSTEM_NOTIFICATION')
  systemNotification(type: BannerColor, msg: string): void {
    sendNotification(type, msg)
  }
}
</script>