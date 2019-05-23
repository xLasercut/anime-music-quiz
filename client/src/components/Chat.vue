<template>
  <el-aside class="chat-container">
    <div class="message-container">
      <ul>
        <li v-for="(message, index) in messages" :key="`chat_${index}`">
          <b v-if="message.user">{{message.user}}: </b>{{message.message}}
        </li>
      </ul>
    </div>
    <el-row class="input-container">
      <el-input v-model="message" @keydown.enter.native="sendMsg()">
        <el-button slot="append" @click="sendMsg()">Send</el-button>
      </el-input>
    </el-row>
  </el-aside>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        messages: [],
        socket: this.$store.state.socket
      }
    },
    methods: {
      sendMsg() {
        if (this.message) {
          this.socket.emit('SEND_MESSAGE', {
            user: this.$store.state.username,
            message: this.message
          });
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
    width: 400px;
    height: 100%;
    padding: 10px;
    background: #E4E7ED;
  }

  .message-container {
    height: calc(100% - 60px);
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