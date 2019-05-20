<template>
  <div>
    <div>
      <ul>
        <li v-for="(message, index) in messages" :key="`chat_${index}`">
          {{message.user}}: {{message.message}}
        </li>
      </ul>
    </div>
    <div>
      <el-input v-model="message" @keydown.enter.native="sendMsg()"></el-input>
      <button @click="sendMsg()">Send</button>
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
      }
    },
    mounted() {
      this.socket.on('MESSAGE', (data) => {
        this.messages.push(data)
      })
    }
  }
</script>