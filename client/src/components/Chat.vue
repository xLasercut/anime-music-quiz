<template>
  <v-flex xs5 sm3 class="chat-container" :style="{ background: $store.getters.color }">
    <div class="message-container">
      <message v-for="(message, index) in messages" :key="`chat_${index}`" :message="message" />
    </div>
    <v-layout justify-center>
      <v-flex shrink class="input-container">
        <v-text-field outline v-model="message" @keydown.enter.native="sendMsg()"></v-text-field>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script lang="coffee">
  import Message from './chat/Message.vue'

  export default
    components: { Message }
    data: () ->
      message: '',
      messages: [],
    sockets:
      MESSAGE: (data) ->
        this.addMessage(data)
        this.$nextTick () =>
          this.scrollChat()
    methods:
      sendMsg: () ->
        if this.message
          this.$socket.emit('USER_MESSAGE', this.message)
          this.message = ''
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
    height: calc(100vh - 80px);
    border-radius: 4px;
  }

  .message-container {
    height: calc(100% - 90px);
    width: 100%;
    overflow: auto;
    word-wrap: break-word;
    padding: 5px;
  }

  .input-container {
    width: 90%;
  }

  ul {
    margin: 0;
    list-style-type: none;
    text-align: left;
    padding: 0;
  }

  li {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .v-list__tile__sub-title {
    word-wrap: break-word;
    white-space: normal;
  }

  .v-list__tile {
    height: 100px;
  }
</style>