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
      <input v-model="message" @keydown.enter="sendMSg()">
      <button @click="sendMSg()">Send</button>
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client'

  export default {
    data() {
      return {
        message: '',
        messages: [],
        socket: io('localhost:3001')
      }
    },
    methods: {
      sendMSg() {
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