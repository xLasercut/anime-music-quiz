<template>
  <v-container fluid>
    <v-row justify="center">
      <game-window></game-window>
      <chat-window></chat-window>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GameWindow from '../game/GameWindow.vue'
import ChatWindow from '../game/ChatWindow.vue'
import { Socket } from 'vue-socket.io-extended'

@Component({
  components: { GameWindow, ChatWindow }
})
export default class Game extends Vue {
  @Socket('disconnect')
  onDisconnect(): void {
    this.$router.push('/')
  }

  mounted() {
    if (!this.$socket.connected) {
      this.$router.push('/')
    }
  }
}
</script>