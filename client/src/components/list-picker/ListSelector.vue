<template>
  <div class="selector-container">
    <v-select
      :items="$store.state.list.userListFiles"
      label="List"
      @change="updateUserList($event)"
      class="mt-2"
    ></v-select>
  </div>
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

<style scoped>
  .selector-container {
    width: 200px;
  }
</style>
