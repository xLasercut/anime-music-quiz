<template>
  <v-col cols="5" sm="4" :class="themeClass('chat-container')">
    <div class="message-container">
      <message v-for="(message, index) in messages" :key="`chat_${index}`" :message="message" />
    </div>
    <chat-input />
  </v-col>
</template>

<script lang="coffee">
  import Message from './chat/Message.vue'
  import ChatInput from './chat/ChatInput.vue'
  import ThemeHelper from '../assets/mixins/theme-helper.coffee'

  export default
    mixins: [ ThemeHelper ]
    components: { Message, ChatInput }
    data: () ->
      message: '',
      messages: [],
    sockets:
      MESSAGE: (data) ->
        this.addMessage(data)
        this.$nextTick () =>
          this.scrollChat()
    methods:
      scrollChat: () ->
        element = document.querySelector('.message-container')
        element.scrollTop = element.scrollHeight - element.clientHeight
      addMessage: (data) ->
        if this.messages.length > 200
          this.messages.splice(0, 1)

        if this.messages.length > 0
          if data.id == this.messages[this.messages.length - 1].id
            data['repeat'] = true
        this.messages.push(data)
      nameColor: (admin) ->
        if admin
          return { color: '#E65100' }
        return {}
</script>

<style scoped>
  .chat-container {
    height: calc(100vh - 85px);
    border-radius: 5px;
  }

  .message-container {
    height: calc(100% - 140px);
    width: 100%;
    overflow: auto;
    word-wrap: break-word;
    padding: 5px;
  }
</style>