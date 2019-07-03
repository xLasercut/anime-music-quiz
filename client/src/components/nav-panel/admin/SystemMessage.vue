<template>
  <v-layout justify-center wrap>
    <v-flex>
      <v-text-field box outline
        v-model="message"
        label="System Message"
        @keydown.enter.native="sendMsg()"
      ></v-text-field>
    </v-flex>
    <v-flex shrink :style="{ width: '120px' }">
      <v-select :items="types" v-model="type"></v-select>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  export default
    data: () ->
      message: ''
      type: 'success'
      types: [ 'success', 'warning', 'error' ]
    methods:
      sendMsg: () ->
        this.$socket.emit('ADMIN_SYSTEM_MESSAGE', this.type, this.message)
        this.message = ''
</script>