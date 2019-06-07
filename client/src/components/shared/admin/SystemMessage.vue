<template>
  <v-layout justify-center wrap>
    <v-flex>
      <v-text-field box outline
        v-model="message"
        label="System Message"
        @keydown.enter.native="sendMsg()"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  export default
    data: () ->
      message: ''
    methods:
      sendMsg: () ->
        this.$socket.emit('ADMIN_SYSTEM_MESSAGE', this.message)
        this.message = ''
</script>