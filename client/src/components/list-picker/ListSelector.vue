<template>
  <v-flex shrink style="width: 300px">
    <v-select
      :items="$store.state.list.userListFiles"
      box label="List"
      @change="updateUserList($event)"
    ></v-select>
  </v-flex>
</template>

<script>
  export default {
    data() {
      return {
        socket: this.$store.state.list.socket
      }
    },
    methods: {
      updateUserList(filename) {
        this.$store.commit('list/UPDATE_FILENAME', filename)
        this.socket.emit('GET_USER_LIST', this.$store.state.list.filename)
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('USER_LIST_FILES', (files) => {
          this.$store.commit('list/UPDATE_USER_LIST_FILES', files)
        })
      }
    }
  }
</script>