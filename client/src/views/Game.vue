<template>
  <v-container fluid>
    <v-row justify="center">
      <game-window></game-window>
      <chat-window></chat-window>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import GameWindow from '../game/GameWindow.vue'
import ChatWindow from '../game/ChatWindow.vue'
import { createComponent, onMounted } from '@vue/composition-api'

export default createComponent({
  components: {
    GameWindow,
    ChatWindow
  },
  sockets: {
    disconnect(): void {
      this.$router.push('/')
    }
  },
  setup(_props, context) {
    const router = context.root.$router

    onMounted((): void => {
      if (!context.root.$socket.connected) {
        context.root.$router.push('/')
      }
    })
  }
})
</script>