<template>
  <v-layout justify-center>
    <v-flex shrink class="input-container">
      <v-textarea
        no-resize solo flat clearable
        v-model.trim="message"
        @keydown.enter.exact.prevent="sendMsg()"
        @click:append="sendMsg()"
        label="Message"
        append-icon="mdi-send"
        rows="3"
      ></v-textarea>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  export default
    data: () ->
      message: ''
    methods:
      sendMsg: () ->
        if this.message
          this.$socket.emit('USER_MESSAGE', this.message)
          this.message = ''
</script>

<style scoped>
  .input-container {
    width: 95%;
  }
</style>