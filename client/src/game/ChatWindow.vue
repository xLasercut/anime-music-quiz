<template>
  <v-col cols="5" sm="4" class="chat-window">
    <div class="message-container">
      <chat-message v-for="(message, index) in messages" :key="`chat_${index}`" :message="message"></chat-message>
    </div>
    <chat-input></chat-input>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChatMessage from './chat-window/ChatMessage.vue'
import ChatInput from './chat-window/ChatInput.vue'
import { Socket } from 'vue-socket.io-extended'
import { ChatObj } from '../../../shared-modules/interfaces'

@Component({
  components: { ChatMessage, ChatInput }
})
export default class ChatWindow extends Vue {
  messages: Array<ChatObj> = []

  @Socket('UPDATE_CHAT_MESSAGE')
  addChatMessage(msgData: ChatObj): void {
    if (this.messages.length > 100) {
      this.messages.splice(0, 1)
    }

    if (this.messages.length > 0) {
      if (msgData.id === this.messages[this.messages.length - 1].id) {
        msgData.repeat = true
      }
    }
    this.messages.push(msgData)
    this.$nextTick(() => {
      this.scrollChat()
    })
  }

  scrollChat(): void {
    let element = document.querySelector('.message-container')
    if (element) {
      element.scrollTop = element.scrollHeight - element.clientHeight
    }
  }
}
</script>

<style scoped>
.chat-window {
  height: calc(100vh - 85px);
  border-radius: 5px;
  background-color: var(--v-background-darken1) !important;
}

.message-container {
  width: 100%;
  height: calc(100% - 140px);
  overflow: auto;
  word-wrap: break-word;
  padding: 5px;
}
</style>