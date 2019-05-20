<template>
  <div class="chat-container">
    <div class="message-container">
      <ul>
        <li v-for="(message, index) in messages" :key="`chat_${index}`">
          <b>{{message.user}}</b>: {{message.message}}
        </li>
      </ul>
    </div>
    <div class="input-container">
      <el-input v-model="message" @keydown.enter.native="sendMsg()">
        <el-button slot="append" @click="sendMsg()">Send</el-button>
      </el-input>

    </div>
  </div>
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
      this.socket.on('MESSAGE', (data) => {
        this.addMessage(data)
        this.$nextTick(() => {
          this.scrollChat()
        })
      })
    }
  }
</script>

<style scoped>
  .chat-container {
    width: 400px;
    height: calc(100% - 20px);
    float: left;
    padding: 10px;
  }

  .message-container {
    height: calc(100% - 75px);
    overflow: auto;
  }

  .input-container {
    padding-top: 10px;
    height: 45px;
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