<template>
  <v-col cols="5" sm="4" class="chat-container" :style="theme">
    <div class="message-container">
      <message v-for="(message, index) in messages" :key="`chat_${index}`" :message="message" />
    </div>
    <chat-input />
  </v-col>
</template>

<script lang="coffee">
  import Message from './chat/Message.vue'
  import ChatInput from './chat/ChatInput.vue'

  export default
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
    computed:
      theme: () ->
        if this.$vuetify.theme.dark
          return { background: 'rgb(33, 33, 33)' }
        return { background: 'rgb(224, 224, 224)' }
</script>

<style scoped>
  .chat-container {
    height: calc(100vh - 60px);
  }

  .message-container {
    height: calc(100% - 165px);
    width: 100%;
    overflow: auto;
    word-wrap: break-word;
    padding: 5px;
  }
</style>