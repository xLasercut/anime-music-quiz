<template>
  <div class="selector-container">
    <v-select
      :items="$store.state.list.userListFiles"
      label="List"
      @change="updateFileName($event)"
      class="mt-5" height="30px" id="user-list-select"
      hide-details
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
