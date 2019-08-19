<template>
  <v-row justify="center">
    <v-col>
      <v-text-field filled
        v-model="message"
        label="System Message"
        @keydown.enter.native="sendMsg()"
      ></v-text-field>
    </v-col>
    <v-col cols="auto" :style="{ width: '120px' }">
      <v-select :items="types" v-model="type"></v-select>
    </v-col>
  </v-row>
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