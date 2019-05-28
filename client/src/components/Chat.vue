<template>
  <v-sheet class="chat-container" :color="$store.getters.color">
    <div class="message-container">
      <ul>
        <li v-for="(message, index) in messages" :key="`chat_${index}`">
          <b v-if="message.user">{{message.user}}: </b>{{message.message}}
        </li>
      </ul>
    </div>
    <v-layout>
      <v-flex>
        <v-text-field v-model="message" @keydown.enter.native="sendMsg()"></v-text-field>
      </v-flex>
    </v-layout>
  </v-sheet>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        messages: [],
        socket: this.$store.state.game.socket
      }
    },
    methods: {
      sendMsg() {
        if (this.message) {
          this.socket.emit('SEND_MESSAGE', this.message)
          this.message = ''
        }
      },
      scrollChat() {
        var element = document.querySelector('.message-container')
        element.scrollTop = element.scrollHeight - element.clientHeight
      },
      addMessage(data) {
        if (this.messages.length > 200) {
          this.messages.splice(0, 1)
        }
        this.messages.push(data)
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('MESSAGE', (data) => {
          this.addMessage(data)
          this.$nextTick(() => {
            this.scrollChat()
          })
        })
      }
    }
  }
</script>

<style scoped>
  .chat-container {
    top: 0;
    right: 0;
    position: absolute;
    width: 250px;
    height: 100%;
    padding: 10px;
  }

  .message-container {
    height: calc(100% - 80px);
    width: 100%;
    overflow: auto;
    word-wrap: break-word;
  }

  .input-container {
    margin-top: 10px;
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
</style>