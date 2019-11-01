<template>
  <v-col cols="5" sm="4" :class="themeclass('chat-window')">
    <div class="message-container">
      <chat-message v-for="(message, index) in messages" :key="`chat_${index}`" :message="message"></chat-message>
    </div>
    <chat-input></chat-input>
  </v-col>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ThemeHelper } from '../assets/mixins'
import ChatMessage from './chat-window/ChatMessage.vue'
import ChatInput from './chat-window/ChatInput.vue'
import { Socket } from 'vue-socket.io-extended'
import { MsgObj } from '../assets/interfaces'

@Component({
  components: { ChatMessage, ChatInput }
})
export default class ChatWindow extends Mixins(ThemeHelper) {
  messages: Array<MsgObj> = []

  @Socket('UPDATE_CHAT_MESSAGE')
  addChatMessage(msgData: MsgObj): void {
    if (this.messages.length > 100) {
      this.messages.splice(0, 1)
    }

    if (this.messages.length > 0) {
      if (msgData.id === this.messages[this.messages.length - 1].id) {
        msgData.repeat = true
      }
    }
    this.messages.push(msgData)
  }
}
</script>

<style scoped>
.chat-window {
  height: calc(100vh - 85px);
  border-radius: 5px;
}

.message-container {
  width: 100%;
  height: calc(100% - 140px);
  overflow: auto;
  word-wrap: break-word;
  padding: 5px;
}
</style>