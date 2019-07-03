<template>
  <div class="selector-container">
    <v-select
      :items="$store.state.userListFiles"
      label="List"
      @change="updateFileName($event)"
      class="mt-2" height="30px" id="user-list-select"
    ></v-select>
  </div>
</template>

<script lang="coffee">
  export default
    methods:
      updateFileName: (filename) ->
        this.$store.commit('list/UPDATE_FILENAME', filename)
        this.$socket.emit('SYNC_USER_LIST', filename)
</script>

<style scoped>
  .selector-container {
    width: 200px;
  }
</style>
